const api = require('../api/api.js');
const request = require('../api/request.js');

// 请求首页分类数据
function getHomeCategoryData(){
  return new Promise((resolve, reject)=>{
    
    request.get(api.CATEGORY_API).then(
      ({data})=>{
        //处理数据
        let list = data.data.kingkongList;
        let newData = [];
        while(list.length > 0){
          let miniList = list.splice(0, 10);
          newData.push(miniList);
        }
        //响应
        resolve(newData);
      }
    ).catch(
      error=>{
        reject(error.message);
      }
    )
  })
}

module.exports = {
  getHomeCategoryData
}