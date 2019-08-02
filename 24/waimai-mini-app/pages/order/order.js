// pages/order/order.js
const userService = require('../../services/userService.js');
const orderService = require('../../services/orderService.js');
const { alert } = require('../../utils/tools.js');
Page({
  data: {
    showLogin: true,
    orderList: []
  },

  onShow(){
    // 获得用户信息
    let TOKEN = wx.getStorageSync('TOKEN');
    userService.getUserInfo(TOKEN)
    .then(res=>{

      this.setData({ showLogin: false });
      ////获得用户的订单
      orderService.getAllOrderData(TOKEN)
      .then(data=>{
        //设置订单，用于页面展示
        this.setData({ orderList: data });

      })
      .catch(alert);

    })


  },

  goMinePage(){
    wx.switchTab({url: '/pages/mine/mine'});
  },



})