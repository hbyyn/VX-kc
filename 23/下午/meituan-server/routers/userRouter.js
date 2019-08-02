const express = require("express");
const axios = require("axios");
const User = require('../model/user');

const router = new express.Router();

// 登录请求
router.get("/login", (req, res) => {
  // 获得客户端的code
  let { code } = req.query;
  if (!code) {
    res.json({
      code: -2,
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
        };
        res.json({ code: 0, message: "登录成功" });

        // 查询用户是否已经注册过
        User.findOne({ openid }).then(result => {
          if (result) {
            // 注册过，什么不做
          } else {
            // 没有注册过，创建新用户
            new User({
              openid
            }).save();
          }
        });
      } else {
        res.json({ code: -2, message: "请求微信服务端失败" });
      }
    })
    .catch(error => {
      console.log("失败");
      res.json({ code: -2, message: "请求微信服务端失败" });
    });
});

// 检查用户是否登录过
router.get("/check_login", (req, res) => {
  setTimeout(() => {
    if (req.session.userInfo) {
      //登录过
      res.json({
        code: 0,
        message: "登录完成，没有过期"
      });
    } else {
      // 没有登录过，登录过期了
      res.json({
        code: -2,
        message: "登录过期了或未登录"
      });
    }
  }, 2000);
});

// 保存用户信息
router.post("/save_userinfo", (req, res) => {
  //判断用户是否登录过
  if (req.session.userInfo) {
    let body = req.body;
    // 保存用户信息
    User.findOneAndUpdate(
      { openid: req.session.userInfo.openid },
      {
        nickName: body.nickName,
        gender: body.gender,
        language: body.language,
        city: body.city,
        province: body.province,
        country: body.country,
        avatarUrl: body.avatarUrl
      }
    )
      .then(result => {
        res.json({
          code: 0,
          message: "保存成功"
        });
      })
      .catch(() => {
        res.json({
          code: -2,
          message: "数据库错误"
        });
      });
  } else {
    res.json({
      code: -1,
      message: "缺少TOKEN，请先登录"
    });
  }
});

// 获得用户信息
router.get("/get_userinfo", (req, res) => {
  if (req.session.userInfo) {
    User.findOne({ openid: req.session.userInfo.openid })
      .then(result => {
        if (result && result.nickName) {
          res.json({
            code: 0,
            data: {
              nickName: result.nickName,
              avatarUrl: result.avatarUrl
            }
          });
        } else {
          res.json({
            code: -3,
            message: "请先授权"
          });
        }
      })
      .catch(error => {
        res.json({
          code: -2,
          message: "数据库错误"
        });
      });
  } else {
    res.json({
      code: -1,
      message: "缺少TOKEN，请先登录"
    });
  }
});

module.exports = router;
