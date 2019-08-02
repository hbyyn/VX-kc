const userService = require('../../services/userService.js');
const {alert} = require('../../utils/tools.js');

Page({

  data: {
    isLogin: false,
    userImage: '',
    userName: ''
  },

  onLoad(){
    //检查用户的token是否可用
    let canUseTOKEN = getApp().canUseTOKEN;
    if (canUseTOKEN ){
      //可以用
      // 获取用户信息
      this.getServerUserInfo();
    }else{
      //设置回调，等待可以用
      //获取用户信息
      getApp().canUseTOKEN_CB = ()=>{
        this.getServerUserInfo();
      }
    }


    
  },

  getServerUserInfo(){
    let TOKEN = wx.getStorageSync('TOKEN');
    //获取服务器用户信息
    userService.getUserInfo(TOKEN )
    //成功
    .then(data=>{
      this.setData({
        isLogin: true,
        userName: data.nickName,
        userImage: data.avatarUrl
      })
    })
  },

  getUserInfoAction(ev){
    let userInfo = ev.detail.userInfo;
    if(userInfo){
      let TOKEN = wx.getStorageSync('TOKEN');
      //用户授权了
      // 发送给后台，保存用户信息
      userService.saveUserInfo({ TOKEN, ...userInfo })
      .then(() => {
        //保存成功
        // 展示用户信息
        this.setData({
          isLogin: true,
          userName: userInfo.nickName,
          userImage: userInfo.avatarUrl
        })
        alert('登录成功');
      })
      .catch(() => {
        //保存失败
        alert('获取用户信息失败');
      })
    }else{
      alert('请先授权获得您的用户信息');
    }
    

  }
  
})