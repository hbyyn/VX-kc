const PubSub = require('../../utils/pubsub.js');

Component({

  relations: {
    // key值为相关组件的路径
    "/components/box2/box2": {
      //关系的作用
      type: 'child',
      linked: function () {
        console.log('wrap linked');

      },
      linkChanged: function () {
        console.log('wrap linkChanged');
      },
      unlinked: function () {
        console.log('wrap unlinked');
      }
    }
  },

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  data: {
    val: '',
    color: 'rebeccapurple'
  },

  methods: {
    changeColor(isOn){
      if(isOn){
        this.setData({color: 'red'});
      }else{
        this.setData({ color: 'rebeccapurple' });
      }
    }
  },

  ready(){

    PubSub.$on('value-change', ( {value} )=>{
      console.log('触发了');
      this.setData({val: value});      
    })

    // 获得box2组件
    let box2 = this.getRelationNodes('/components/box2/box2')[0];

  }


})
