const service = require('../../services/homeService.js');

Page({

  listPage: 1,
  data: {
    shopList: []
  },

  onLoad: function (options) {
    // 设置标题
    wx.setNavigationBarTitle({
      title: options.title
    });

    // 请求数据
    service.getShopListData(this.listPage, options.id)
    .then(({ data, count})=>{
      // 设置列表数据
      this.setData({ shopList: data });
    })

  }

})