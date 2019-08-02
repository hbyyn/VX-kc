const user = require('../../utils/user.js');
Page({
  data: {
    isLogin: false,
    nickname: '',
    headerImg: ''
  },

  onReady(){
    let isLogin = getApp().isLogin;
    if(isLogin){
      this.getServerUserInfo();
    }else{
      getApp().loginCallBack = ()=>{
        this.getServerUserInfo();
      }
    }
  },


  getServerUserInfo(){
    console.log('获得用户信息');
    wx.request({
      url: 'http://localhost:9000/api/get_userinfo',
      data: {
        TOKEN: wx.getStorageSync('TOKEN')
      },
      success: (res)=>{
        if(res.data.code !==0){
          return; 
        }
        // return;
        this.setData({
          isLogin: true,
          headerImg: res.data.avatarUrl,
          nickname: res.data.nickName
        })
      }
    })
  },

  getUserInfoAction(info){
    // 用户授权获得用户信息,保存用户到后台
    if(wx.getStorageSync('TOKEN')){

      let userInfo = info.detail.userInfo;
      user.saveUserInfo({
        ...userInfo,
        TOKEN: wx.getStorageSync('TOKEN')
      });

      this.setData({
          isLogin: true,
          headerImg: userInfo.avatarUrl,
          nickname: userInfo.nickName
      })

    }
    
  }
})