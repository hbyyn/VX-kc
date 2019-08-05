const service = require('../../services/homeService.js');
const { alert } = require('../../utils/tools.js');

Page({

  data: {
    addressText: '深圳西部硅谷',
    categoryList: [],
    selectIndex: 0
  },

  onLoad(){
    // 请求分类列表数据
    service.getHomeCategoryData()
    .then(data=>{
      this.setData({ categoryList: data });
    })
    .catch(alert);
    
  },

  // 分类翻页事件
  categoryChangeAction(event){
    this.setData({ selectIndex: event.detail.current});
  }

})