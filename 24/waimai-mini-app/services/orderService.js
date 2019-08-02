const api = require('../api/api.js');
const request = require('../api/request.js');

function getAllOrderData(TOKEN){
  return new Promise((resolve, reject)=>{
    request.get(api.GET_ORDER_API, { TOKEN })
    .then((({data}) => {
      if(data.code === 0){
        resolve(data.result);
      }else{
        reject(data.message);
      }
    }))
    .catch((error)=>{
      reject(error.message);
    })
  })
}

module.exports = {
  getAllOrderData
}