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

// 店铺头部信息
// method: GET
// params: id(Y)
const SHOP_HEADER_API = HOST + '/meituan/shop/header';

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

// 生成订单
// method： POST
// params： TOKEN，shopId, list, pay
const ADD_ORDER_API = HOST + '/meituan/order/add';

export default  {
  CITY_LIST_API,
  ADDRESS_API,
  CATEGORY_API,
  SHOP_LIST_API,
  SHOP_HEADER_API,
  SHOP_DETAIL_API,
  SHOP_COMMENT_API,
  SHOP_INFO_API,
  ADD_ORDER_API
}
