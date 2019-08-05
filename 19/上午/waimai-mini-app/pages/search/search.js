// pages/search/search.js
Page({

  inputVal: '',
  
  getValueAction(ev){
    console.log(ev);
    this.inputVal = ev.detail.value;
  },
  searchAction(){
    // 记录用户搜索的文字
    // 获得首页
    let homePage = getCurrentPages()[0];
    // 设置关键字
    homePage.setKeywordAction && homePage.setKeywordAction(this.inputVal);
    // 发送搜索请求
    //。。。。。
  }
})