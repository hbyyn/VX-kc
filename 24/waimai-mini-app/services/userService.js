import api from '../api/api.js'
import request from '../api/request.js'

// 登录
function login(code){
  return new Promise((resolve, reject)=>{
    request.get(api.USETR_LOGIN_API, { code })
      .then(({ data, cookies }) => {
        if (data.code === 0) {
          //登录成功
          // 保存登录态
          let cookie = cookies.find((item) => {
            return item.name === 'TOKEN'
          });
          wx.setStorageSync('TOKEN', cookie.value);
          resolve();
        } else {
          //登录失败
          reject();
        }
      })
      .catch(() => {
        //登录失败
        reject();
      })
  })
}

// 检查登录是否过期
function checkLogin(TOKEN){
  return new Promise((resolve, reject)=>{
    request.get(api.USETR_CHECKLOGIN_API, { TOKEN })
    .then(({data})=>{
      resolve(data.code);
    })
    .catch(()=>{
      resolve(-100);
    })
  })
}

// 保存用户信息
function saveUserInfo(info){
  return new Promise((resolve, reject)=>{
    request.post(api.USETR_SAVE_INFO_API, { ...info })
      .then(({ data }) => {
        if (data.code === 0) {
          resolve();
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      })
  })
}

// 获取用户信息
function getUserInfo(TOKEN){
  return new Promise((resolve, reject)=>{
    request.get(api.USETR_GET_INFO_API, { TOKEN })
    .then(({ data}) => {
      console.log(data);
      if (data.code === 0) {
        resolve(data.data);
      } else {
        reject();
      }
    })
    .catch(() => {
      reject();
    })
  })
}

module.exports = {
  login,
  checkLogin,
  saveUserInfo,
  getUserInfo
}