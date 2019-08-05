const HOST = 'http://localhost:7000';
// const HOST = 'https://www.littleemmayang.com';

//城市列表
// method: GET
const CITY_LIST_API = HOST + '/meituan/address/city/list';

//首页分类
// method: GET
const CATEGORY_API = HOST + '/meituan/home/category';


module.exports = {
  CITY_LIST_API,
  CATEGORY_API
}

/*
####搜索地址
url: /meituan/address/search
method: GET



####店铺列表
url: /meituan/shop/list
method: GET
params: page(N,1) count(N,12) category(N,'')

####店铺详情
url: /meituan/shop/detail
method: GET
params: id(Y)

####店铺评价
url: /meituan/shop/comment
method: GET
params: id(Y)

####店铺信息
url: /meituan/shop/info
method: GET
params: id(Y)
*/
