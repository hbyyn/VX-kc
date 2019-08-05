const service = require('../../services/homeService.js');
const { alert } = require('../../utils/tools.js');

Page({

  data: {
    addressText: '深圳西部硅谷',
    categoryList: [],
    selectIndex: 0,
    shopList: []
  },

  onLoad(){
    // 请求分类列表数据
    service.getHomeCategoryData()
    .then(data=>{
      this.setData({ categoryList: data });
    })
    .catch(alert);
    // 请求店铺数据
    service.getShopListData()
    .then(data=>{
      this.setData({ shopList: data });
    })
    .catch(alert);
    
  },

  // 分类翻页事件
  categoryChangeAction(event){
    this.setData({ selectIndex: event.detail.current});
  }

})