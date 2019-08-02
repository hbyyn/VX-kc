const express = require("express");

const bodyParser = require("body-parser");
const session = require("express-session");

const MongoDBStore = require("connect-mongodb-session")(session);

const app = express();

// 解析post请求的参数
app.use(bodyParser());

//设置cookie
app.use((req, res, next) => {
  let TOKEN = (req.query && req.query.TOKEN) || (req.body && req.body.TOKEN);
  if (TOKEN) {
    req.headers.cookie = `TOKEN=${TOKEN};`;
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
    name: "TOKEN",
    secret: "hello",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
  })
);

app.get("/meituan", (req, res) => {
  res.end("welcome!");
});

// 使用路由处理请求
app.use('/meituan/api', require('./routers/userRouter'));
app.use('/meituan/order', require('./routers/orderRouter'));
app.use('/meituan', require('./routers/mainRouter'));


require("mongoose").connect(
  "mongodb://localhost:27017/db",
  { useNewUrlParser: true },
  error => {
    if (!error) {
      app.listen(7000, "localhost", error => {
        if (error) {
          console.log("启动失败");
        } else {
          console.log("启动成功");
        }
      });
    } else {
      console.log("数据库链接失败");
    }
  }
);
