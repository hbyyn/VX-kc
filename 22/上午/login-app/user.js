function login(){
  // 登录，获得code
  wx.login({
    success({ code }) {
      // 将code发送给后台服务器
      wx.request({
        url: 'http://localhost:9000/api/login',
        data: {
          code
        },
        success(res) {
          if (res.statusCode === 200 && res.data.code === 0) {
            //后台登录成功
            // 保存登录态
            let cookie = res.cookies.find(item => {
              return item.name === 'TOKEN'
            })
            wx.setStorageSync('TOKEN', cookie.value);
          }
        },
        fail(err) {
          console.log(err);
        }
      })
    },
    fail(err) {
      console.log(err);
    }
  })
}

function checkLogin(){
  wx.request({
    url: 'http://localhost:9000/api/check_login',
  })
}

module.exports = {
  login,
  checkLogin
}