// components/shop-item/shop-item.js
Component({

  properties: {
    info: {
      type: Object
    }
  },

  lifetimes: {
    ready(){
      console.log(this.data.info);
    }
  }

})
