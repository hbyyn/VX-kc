// components/father/father.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    sonData: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSelect(ev){
      console.log('父组件handleSelect执行了');
      this.setData({ sonData: ev.detail.item });
    }
  }
})
