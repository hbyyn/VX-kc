const user = require('./utils/user.js');

App({
  isLogin: false,

  onLaunch(){
    //取得token
    let token = wx.getStorageSync('TOKEN');
    if (token){
      // 判断是否过期
      // 没过期不用登录
      // 过期了重新登录
      user.checkLogin().then(()=>{
        this.finishLogin();
        
      }).catch(()=>{
        user.login();
      })
    }
    else{
      user.login().then(()=>{
        this.finishLogin();
      })
    }
    
  },

  finishLogin(){
    this.isLogin = true;
    this.loginCallBack && this.loginCallBack();
  }


})