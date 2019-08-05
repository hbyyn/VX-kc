// components/son/son.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: ['a', 'b', 'c', 'd']
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectOptionAction(ev){
      console.log('点击了');
      let {item, val} = ev.currentTarget.dataset;
      console.log(item);
      // 触发父组件事件
      this.triggerEvent('selected', {item});
    }
  }
})
