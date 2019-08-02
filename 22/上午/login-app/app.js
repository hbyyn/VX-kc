const user = require('./user.js');
App({
  onLaunch(){
    let token = wx.getStorageSync('TOKEN');
    if (token){
      // 判断是否过期
      // 没过期不用登录
      // 过期了重新登录
      checkLogin()
    }else{
      user.login();
    }
    
  }
})