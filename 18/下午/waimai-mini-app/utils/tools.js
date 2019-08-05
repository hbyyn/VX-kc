module.exports = {

  alert(msg){
    wx.showToast({
      title: msg,
      icon: 'none'
    })
  }

}