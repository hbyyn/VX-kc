const HOST = 'http://localhost:7000';
// const HOST = 'https://www.littleemmayang.com';

//城市列表
// method: GET
const CITY_LIST_API = HOST + '/meituan/address/city/list';

// 搜索地址
// method: GET
// params: city(Y) keyword(Y)
const ADDRESS_API = HOST + '/meituan/address/search';

//首页分类
// method: GET
const CATEGORY_API = HOST + '/meituan/home/category';

// 店铺列表
// method: GET
// params: page(N, 1) count(N, 12) longitude(Y) latitude(Y) category(N, '')
const SHOP_LIST_API = HOST + '/meituan/shop/list';

// 店铺详情
// method: GET
// params: id(Y)
const SHOP_DETAIL_API = HOST + '/meituan/shop/detail';

// 店铺评价
// method: GET
// params: id(Y)
const SHOP_COMMENT_API = HOST + '/meituan/shop/comment';

// 店铺信息
// method: GET
// params: id(Y)
const SHOP_INFO_API = HOST + '/meituan/shop/info';


// 用户登录
// method：GET
// params: code(Y)
const USETR_LOGIN_API = HOST + '/meituan/api/login';

// 检查用户是否登录过
// method：GET
// params: TOKEN(Y)
const USETR_CHECKLOGIN_API = HOST + '/meituan/api/check_login';

// 保存用户信息
// method：POST
// params: TOKEN(Y) .......
const USETR_SAVE_INFO_API = HOST + '/meituan/api/save_userinfo';

// 获得用户信息
// method：GET
// params: TOKEN(Y)
const USETR_GET_INFO_API = HOST + '/meituan/api/get_userinfo';

// 获得用户的所有订单
// method：GET
// params: TOKEN(Y)
const GET_ORDER_API = HOST + '/meituan/order/get_all';

module.exports = {
  CITY_LIST_API,
  ADDRESS_API,
  CATEGORY_API,
  SHOP_LIST_API,
  SHOP_DETAIL_API,
  SHOP_COMMENT_API,
  SHOP_INFO_API,
  USETR_LOGIN_API,
  USETR_CHECKLOGIN_API,
  USETR_SAVE_INFO_API,
  USETR_GET_INFO_API,
  GET_ORDER_API
}
