const express = require("express");
const axios = require("axios");
const bodyParser = require('body-parser');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const User = require('./user');

const app = express();

// 解析post请求的参数
app.use(bodyParser());

//设置cookie
app.use((req, res, next)=>{
  let TOKEN = (req.query && req.query.TOKEN) || (req.body && req.body.TOKEN);
  if(TOKEN){
    req.headers.cookie = `TOKEN=${TOKEN};`
  }
  next();
});

// 设置session保存的位置
var store = new MongoDBStore({
  uri: "mongodb://localhost:27017/db",
  collection: "mySessions"
});
//监听错误
store.on("error", function(error) {
  console.log(error);
});


// 对每一个请求处理session
app.use(
  require("express-session")({
    name: 'TOKEN',
    secret: "hello",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
  })
);

app.get("/", (req, res) => {
  res.end("welcome!");
});

// 登录请求
app.get("/api/login", (req, res) => {
  // 获得客户端的code
  let { code } = req.query;
  if (!code) {
    res.json({
      code: -1,
      message: "缺少code"
    });
    return;
  }
  // 取得小程序信息
  let appid = "wx56c480b7c69a67b1";
  let appSecret = "80be0becdff25d38b30fb6d601d1bb3b";

  /*
    https://api.weixin.qq.com/sns/jscode2session
    ?appid=APPID
    &secret=SECRET
    &js_code=JSCODE
    &grant_type=authorization_code
    */

  //   发送请求给微信服务端
  let path = "https://api.weixin.qq.com/sns/jscode2session";
  path += `?appid=${appid}`;
  path += `&secret=${appSecret}`;
  path += `&js_code=${code}`;
  path += `&grant_type=authorization_code`;
  axios
    .get(path)
    .then(response => {
      if (response.status === 200) {
        //得到用户的信息
        let { openid, session_key } = response.data;
        //将openid和session_key设置在session中，只需要给客户端登录态
        req.session.userInfo = {
            openid,
            session_key
        }
        res.json({code: 0});

        // 查询用户是否已经注册过
        User.findOne({openid}).then(result=>{
          if(result){
            // 注册过，什么不做
          }else{
            // 没有注册过，创建新用户
            new User({
              openid
            }).save();
          }
        })
        

      }else{
          res.json({code: -1});
      }
    })
    .catch(error => {
      console.log("失败");
      res.json({code: -2});
    });
});

// 检查用户是否登录过
app.get('/api/check_login', (req, res)=>{

  setTimeout(() => {
    let session = req.session;
    if(req.session.userInfo){
      //登录过
      res.json({
        code: 0
      })
    }else{
      // 没有登录过，登录过期了
      res.json({
        code: -1
      })
    }
  }, 2000);
    
})


app.post('/api/save_userinfo', (req, res)=>{
  //判断用户是否登录过
  if(req.session.userInfo){
    let body = req.body;
    // 保存用户信息
    User.findOneAndUpdate({openid: req.session.userInfo.openid}, {
      nickName: body.nickName,
      gender: body.gender,
      language: body.language,
      city: body.city,
      province: body.province,
      country: body.country,
      avatarUrl: body.avatarUrl
    }).then(result=>{
      res.json({
        code: 0
      })
    })
    .catch(()=>{
      res.json({
        code: -1
      })
    })
  }else{
    res.json({
      code: -2
    })
  }

})

// 获得用户信息
app.get('/api/get_userinfo', (req, res)=>{
  console.log(req.session.userInfo)
  if(req.session.userInfo){
    User.findOne({openid: req.session.userInfo.openid})
    .then(result=>{
      res.json({
        code: 0,
        nickName: result.nickName,
        avatarUrl: result.avatarUrl
      })
    })
    .catch((error)=>{
      console.log(error);
      res.json({
        code: -1
      });
    })
  }else{
    res.json({
      code: -2
    })
  }
})

require('mongoose').connect('mongodb://localhost:27017/db',  { useNewUrlParser: true }, (error=>{
  if(!error){
    app.listen(9000, "localhost", error => {
      if (error) {
        console.log("启动失败");
      } else {
        console.log("启动成功");
      }
    });
  }else{
    console.log('数据库链接失败');
  }
}))
