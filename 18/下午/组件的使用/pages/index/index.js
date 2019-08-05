Page({
  data: {
    val: 'test'
  },
  onReady(){
    setTimeout(()=>{
      this.setData({val: 'qwe'});
    }, 2000);
  }
})