
function login(){
  return new Promise((resolve, reject)=>{
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
              // 取得后台给的登录态
              let cookie = res.cookies.find(item => {
                return item.name === "TOKEN"
              })
              // 保存登录态
              wx.setStorageSync('TOKEN', cookie.value);
              // 登录成功
              resolve();
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
  })
}

function checkLogin(){
  let value = wx.getStorageSync('TOKEN');
  
  return new Promise((resolve, reject)=>{
    wx.request({
      url: 'http://localhost:9000/api/check_login',
      data: {
        TOKEN: value
      },
      success(res) {
        if (res.statusCode === 200 && res.data.code === 0) {
          //没有过期
          resolve();
        } else {
          reject();
        }
      },
      fail(err) {
        reject();
      }
    });
  });
}

function saveUserInfo(info){
  wx.request({
    url: 'http://localhost:9000/api/save_userinfo',
    data: info,
    method: 'POST',
    success(res){
      console.log(res);
    },
    fail(){

    }
  })
}


module.exports = {
  login,
  checkLogin,
  saveUserInfo
}