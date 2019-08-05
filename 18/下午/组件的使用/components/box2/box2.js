// components/box2/box2.js
Component({
  
  relations: {

    // key值为相关组件的路径
    "/components/wrap/wrap": {
      //关系的作用
      type: 'parent',
      linked: function(){
        console.log('box2 linked');

      },
      linkChanged: function(){
        console.log('box2 linkChanged');
      },
      unlinked: function(){
        console.log('box2 unlinked');
      }
    }

  },
  
  methods: {
    switchChangeAction(ev){
      console.log(ev);
      let val = ev.detail.value;
      // 传值给wrap
      let parent = this.getRelationNodes('/components/wrap/wrap')[0];
      // 调用wrap组件的函数，切换颜色
      parent.changeColor(val);

    }
  },

  ready(){
    //获得wrap组件
    let parent = this.getRelationNodes('/components/wrap/wrap')[0];
    

  }

})
