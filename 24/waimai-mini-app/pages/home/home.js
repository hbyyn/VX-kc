const service = require('../../services/homeService.js');
const { alert } = require('../../utils/tools.js');

Page({

  listPage: 1,
  isLoadMore: false,
  listCount: 0,
  data: {
    addressText: '深圳西部硅谷',
    keyword: '',
    categoryList: [],
    selectIndex: 0,
    shopList: [],
    canLoadMore: true
  },

  onLoad(){
    // 请求分类列表数据
    service.getHomeCategoryData()
    .then(data=>{
      this.setData({ categoryList: data });
    })
    .catch(alert);
    // 请求店铺数据
    service.getShopListData(this.listPage)
    .then(({ data, count })=>{
      // 设置列表数据
      this.setData({ shopList: data });
      // 获得后台数据长度
      this.listCount = count;
      //  判断是否可以加载更多
      if(this.data.shopList.length >= this.listCount){
        this.setData({ canLoadMore: false });
      }else{
        this.listPage += 1;
      }
    })
    .catch(alert);
    
  },

  // 搜索框点击事件，进入搜索页面
  goSearchAction(){
    wx.navigateTo({
      url: '../search/search'
    })
  },

  // 设置搜索关键字
  setKeywordAction(keyword){
    this.setData({ keyword });
  },

  // 分类翻页事件
  categoryChangeAction(event){
    this.setData({ selectIndex: event.detail.current});
  },
  // 分类列表的点击事件，进入分类页面
  goCategoryAction(ev){
    let { id, item } = ev.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/category/category?title=${item}&id=${id}`
    })
  },

  // 上拉加载更多
  onReachBottom(){
    // 判断是否加载完毕
    if (!this.data.canLoadMore){
      return;
    }
    //防抖
    if ( this.isLoadMore ){
      return;
    }
    this.isLoadMore = true;
    console.log('加载更多');

    // 请求数据
    service.getShopListData(this.listPage)
    .then(({ data })=>{
      // 设置列表数据
      this.setData({ shopList: [...this.data.shopList, ...data] });
      //  判断是否可以加载更多
      console.log(this.data.shopList.length);
      console.log(this.listCount);
      if (this.data.shopList.length >= this.listCount) {
        this.setData({ canLoadMore: false });
      } else {
        this.listPage += 1;
      }
      this.isLoadMore = false;
    })
    .catch((message)=>{
      alert(message);
      this.isLoadMore = false;
    });
  }

})