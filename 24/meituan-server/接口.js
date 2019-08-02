####城市列表
url: /meituan/address/city/list
method: GET

####搜索地址
url: /meituan/address/search
method: GET

####首页分类
url: /meituan/home/category
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

