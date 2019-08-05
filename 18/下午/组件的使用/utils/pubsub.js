let eventMap = {};



module.exports = {
  // 监听事件
  $on(eventName, callback){
    // 判断eventMap中有没有eventName对应的事件回调列表
    if(!eventMap[eventName]){
      eventMap[eventName] = [];
    }
    // 将回调保存在事件回调的列表中
    eventMap[eventName].push(callback);

  },
  // 触发事件
  $emit(eventName, params){
    // 判断是否有监听，如没有则返回
    if (!eventMap[eventName]){
      return;
    }
    // 取得事件回调的列表
    let callbackArr = eventMap[eventName];
    // 遍历列表，调用每一个回调函数
    callbackArr.forEach(cb=>{
      cb(params);
    })
  },
  // 移除事件监听
  $off(eventName, callback){
    // 移除所有
    if(!eventName && !callback){
      eventMap = {};
    }
    // 移除一个事件的所有监听
    else if(eventName && !callback){
      eventMap[eventName] = [];
    }
    // 移除一个事件的一个监听
    else if(eventName && callback){
      let callbackArr = eventMap[eventName];
      eventMap[eventName] = callbackArr.filter(item=>{
        return item != callback;
      })
    }
  }
}