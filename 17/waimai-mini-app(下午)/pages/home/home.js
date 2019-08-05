// 页面的逻辑
// pages/home/home.js

// 在js中不用dom，bom操作
// 在html中js可以中的事情，这里都可以
// 支持es6
// 但是不支持es6模块化，模块化采用commonJS


// 页面的启动函数
Page({
  /**
   * 页面的初始数据
   */
  /*
  js中访问，使用this.data.message
  js中修改，使用this.setData({message: 'hello world'});
  wxml中可以访问{{message}}
  */
  data: {
    message: 'hello 小程序'
    
  },
  /*
  不需要wxml渲染的数据，可以在直接写在page中，不需要写在data中
  访问 this.value
  修改 this.value = '....';
  可以提高页面的渲染性能
  */ 
  value: '',

  // js中调用：this.testAction()
  // wxml中调用：<button bindtap='testAction'>测试</button>
  testAction(){
    console.log('testAction触发了');
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('home onLoad');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('home onReady');

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('home onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('home onHide');

    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('home onUnload');

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('home onPullDownRefresh');
    // 请求后台的新数据
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('home onReachBottom');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    console.log('home onShareAppMessage');
    console.log(options);
    // options.from  触发分享的来源，menu，button
    // options.target 只有触发分享使用按钮触发才有值，代表按钮对象

    return {
      title: '快来领红包',
      path: '/pages/detail/detail?username=yang&userid=007',
      imageUrl: 'http://pic75.nipic.com/file/20150821/9448607_145742365000_2.jpg'
    }
  },

  // 页面滚动时触发
  // 建议不要实现这个函数
  // 建议不要在函数中使用setData
  // onPageScroll({ scrollTop }){
  //   console.log('scroll');
  //   console.log(scrollTop)
  // }

  onResize(res){
    // res屏幕的信息
    console.log('home onResize');
  },

  onTabItemTap(options){
    console.log('home onTabItemTap');
    // console.log(options);
  },





})