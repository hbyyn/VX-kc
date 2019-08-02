const userService = require('./services/userService.js');

App({

  // 用户是否有登录态
  canUseTOKEN: false,

  onLaunch(){

    // 检查是否登录过
    let TOKEN = wx.getStorageSync('TOKEN');
    if (TOKEN){
      //登录过
      // 检查是否过期
      userService.checkLogin(TOKEN)
      .then(status=>{
        if(status === 0){
          //没有过期
          this.canUseTOKEN = true;
          this.canUseTOKEN_CB && this.canUseTOKEN_CB();

        }else{
          //过期了
          this.loginAction();
        }
      })
    }else{
      //没有登录过
      this.loginAction();
    }
    

  },
  
  loginAction(){
    // 微信客户端登录，获得code
    wx.login({
      success: ({ code })=>{
        //小程序的服务器登录，通过code换session_key和openid，
        // 服务器返回登录态
        // 保存登录态
        userService.login(code).then(()=>{
          this.canUseTOKEN = true;
          this.canUseTOKEN_CB && this.canUseTOKEN_CB();
        })
      }
    })
  },

  
  // 小程序出错了
  onError: function (msg) {
    console.log('app onError');  
    //收集错误信息      
  },
  

  // 页面找不到
  onPageNotFound: function (res){
    console.log('app onPageNotFound');
    //收集错误信息     

    // 返回首页 
    wx.redirectTo({
      url: 'pages/home/home'
    })
  }


})


