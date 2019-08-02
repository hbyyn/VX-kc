// 封装请求
function get(url, params = ''){
  return new Promise((resolve, reject)=>{
    wx.request({
      url: url,
      data: params,
      header: {

      },
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if(res.statusCode === 200){
          resolve(res);
        }else{
          reject({
            code: res.statusCode,
            message: '请求失败'
          });
        }
      },
      fail: function (res) {
        reject({
          code: -1,
          message: '请求失败'
        });
      }
    })
  })
}

function post(url, params = ''){
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: params,
      header: {

      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          reject({
            code: res.statusCode,
            message: '请求失败'
          });
        }
      },
      fail: function (res) {
        reject({
          code: -1,
          message: '请求失败'
        });
      }
    })
  })
}

export default {
  get,
  post
}