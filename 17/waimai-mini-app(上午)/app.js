//小程序的启动文件

// 启动小程序
App({

  /*
    在app中访问自定义的属性和方法使用this访问
    console.log(this.title);
    this.getLocation();
    在app外部访问自定义的属性和方法使用this访问
    // 先获得app对象
    const app = getApp();
    // 再访问
    console.log(app.title);
    app.getLocation();
  */
  title: '美团外卖',
  getLocation: function(){
    console.log('getLocation执行了');
  },
   


  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    console.log('app onLaunch');
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    console.log('app onShow');
    //取得用户进入的方式
    // console.log(options.scene);
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    console.log('app onHide');    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
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


