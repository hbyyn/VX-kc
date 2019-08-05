// components/com/com.js
Component({
  /**
   * 组件的属性列表
   */
  // 接收外部属性
  // 这个属性在wxml中访问： <view>{{title}}</view>
  // 在js中访问 this.data.title
  // 不能修改，单项数据流
  properties: {
    title: {
      type: String,//接收的属性类型
      value: '你好',//默认值
      //外部属性监听
      observer: function(newVal, oldVal){
        console.log('变化了');
      }
    }
  },

  /**
   * 组件的初始数据
   */
  // 使用方式和修改方式和组件
  data: {

  },

  /**
   * 组件的方法列表
   * wxml中访问  <button bindtap='btnAction'>按钮</button>
   * js中访问  this.btnAction();
   */
  methods: {
    btnAction(){
      console.log('btnAction执行了');
    }
  },

  created() {
    console.log('com created');
  },
  attached() {
    console.log('com attached');
  },
  ready() {
    console.log('com ready');
  },
  moved() {
    console.log('com moved');
  },
  detached() {
    console.log('com detached');
  },

  lifetimes: {
    created() {
      console.log('1com created');
    },
    attached() {
      console.log('1com attached');
    },
    ready() {
      console.log('com ready');
    },
    moved() {
      console.log('com moved');
    },
    detached() {
      console.log('com detached');
    }
  },

  // 组件所在哪个页面，该页面执行生命周期函数时，pageLifetimes内部配置的生命周期函数也执行
  pageLifetimes: {
    show(){
      console.log('show');

    },
    hide(){
      console.log('hide');
    }
  }




})
