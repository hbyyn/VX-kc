const express = require("express");
const axios = require("axios");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();

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

app.get("/api/login", (req, res) => {

  let { code } = req.query;
  if (!code) {
    res.json({
      code: -1,
      message: "缺少code"
    });
    return;
  }
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
        console.log("成功");
        let { openid, session_key } = response.data;
        // 将openid和session_key设置在session中，只需要给客户端登录态
        req.session.userInfo = {
            openid,
            session_key
        }
        res.json({code: 0});
      }else{
          res.json({code: -1});
      }
    })
    .catch(error => {
      console.log("失败");
      res.json({code: -2});
    });
});

app.get('/api/check_login', (req, res)=>{
    console.log(req.session.userInfo);
})

app.listen(9000, "localhost", error => {
  if (error) {
    console.log("启动失败");
  } else {
    console.log("启动成功");
  }
});
