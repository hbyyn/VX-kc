// components/shop-item/shop-item.js
Component({

  properties: {
    info: {
      type: Object
    }
  },

  methods: {
    goDetailAction(){
      console.log(this.data.info);
      let { shopName, mtWmPoiId: id } = this.data.info;
      console.log(`/pages/detail/main?name=${shopName}&id=${id}`)
      wx.navigateTo({
        url: `/pages/detail/main?name=${shopName}&id=${id}`
      })
    }
  }

})
