//小程序的启动文件

// 启动小程序
App({

  

  
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


