require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([1],{

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_api__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_request__ = __webpack_require__(29);



// 菜单


var state = {
    menuNav: [],
    menuList: []
};

var mutations = {
    setShopMenuData: function setShopMenuData(state, params) {
        state.menuNav = params.menuNav;
        state.menuList = params.menuList;
    }
};

var actions = {
    // 请求商家菜单数据
    getShopMenuData: function getShopMenuData(context, params) {
        var _this = this;

        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
            var data, categoryList, menuNav, menuList;
            return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return __WEBPACK_IMPORTED_MODULE_4__api_request__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_3__api_api__["a" /* default */].SHOP_DETAIL_API, { id: params.id });

                        case 3:
                            data = _context.sent;
                            categoryList = data.data.data.categoryList;
                            // 获得菜单导航栏数据

                            menuNav = categoryList.map(function (item) {
                                return {
                                    name: item.categoryName,
                                    icon: item.iconUrl,
                                    tag: item.tag
                                };
                            });
                            // 获得菜单数据

                            menuList = categoryList.map(function (item) {
                                return item.spuList;
                            });
                            //  设置数据

                            context.commit('setShopMenuData', { menuNav: menuNav, menuList: menuList });
                            console.log(menuList);
                            _context.next = 14;
                            break;

                        case 11:
                            _context.prev = 11;
                            _context.t0 = _context['catch'](0);
                            return _context.abrupt('return', __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject(_context.t0.message));

                        case 14:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 11]]);
        }))();
    }
};

/* harmony default export */ __webpack_exports__["a"] = ({
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions
});

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_api__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_request__ = __webpack_require__(29);


// 购物车
var state = {
    cartList: wx.getStorageSync('cart') || []
};

var saveData = function saveData(cartList) {
    wx.setStorage({
        key: 'cart',
        data: cartList
    });
};

var getCountPrice = function getCountPrice(shopInfo) {
    var price = 0;
    shopInfo.list.forEach(function (goods) {
        price += goods.price * goods.count;
    });
    //计算折扣
    return price;
};

var mutations = {
    //商品数量+1
    addGoods: function addGoods(state, params /*shopid, goodsid*/) {
        var shopId = params.shopId,
            goodsId = params.goodsId,
            price = params.price,
            name = params.name;

        var shopInfo = state.cartList.find(function (item) {
            return item.shopId === shopId;
        });
        if (shopInfo) {
            //已经商家
            var goodsInfo = shopInfo.list.find(function (item) {
                return item.goodsId === goodsId;
            });
            if (goodsInfo) {
                //商品已经添加过
                goodsInfo.count += 1;
                //计算价格
                shopInfo.allPrice = getCountPrice(shopInfo);
                saveData(state.cartList); //保存数据
            } else {
                //没有添加商品，需要添加商品
                shopInfo.list.push({ goodsId: goodsId, count: 1, price: price, name: name });
                //计算价格
                shopInfo.allPrice = getCountPrice(shopInfo);
                saveData(state.cartList); //保存数据
            }
        } else {
            //第一次添加商家，和商品
            var _shopInfo = {
                shopId: shopId,
                list: [{ goodsId: goodsId, count: 1, price: price, name: name }],
                allPrice: 0
            };
            state.cartList.push(_shopInfo);
            //计算价格
            _shopInfo.allPrice = getCountPrice(_shopInfo);
            saveData(state.cartList); //保存数据
        }
    },

    //商品数量-1
    reduceGoods: function reduceGoods(state, params /*shopid, goodsid*/) {
        var shopId = params.shopId,
            goodsId = params.goodsId;
        // 查找商家

        var shopInfo = state.cartList.find(function (shopInfo) {
            return shopInfo.shopId === shopId;
        });
        // 查找商品
        var goodsInfo = shopInfo.list.find(function (item) {
            return item.goodsId === goodsId;
        });
        //减商品数量
        goodsInfo.count--;
        // 计算价格
        shopInfo.allPrice = getCountPrice(shopInfo);
        saveData(state.cartList); //保存数据
    },

    // 删除商品
    deleteGoods: function deleteGoods(state, params /*shopid, goodsid*/) {
        var shopId = params.shopId,
            goodsId = params.goodsId;
        // 查找商家

        var shopInfo = state.cartList.find(function (shopInfo) {
            return shopInfo.shopId === shopId;
        });
        // 查找商品的位置
        var index = shopInfo.list.findIndex(function (item) {
            return item.goodsId === goodsId;
        });
        // 删除商品
        shopInfo.list.splice(index, 1);
        shopInfo.allPrice = getCountPrice(shopInfo);
        saveData(state.cartList); //保存数据
    },
    finishOrder: function finishOrder(state, params) {
        var shopId = params.shopId;

        state.cartList = state.cartList.filter(function (item) {
            return item.shopId !== shopId;
        });
        saveData(state.cartList);
    }
};

var actions = {
    payAction: function payAction(context, params) {
        var shopId = params.shopId,
            TOKEN = params.TOKEN;
        // 获得该商家的购物车数据

        var shopInfo = state.cartList.find(function (shopInfo) {
            return shopInfo.shopId === shopId;
        });
        __WEBPACK_IMPORTED_MODULE_1__api_request__["a" /* default */].post(__WEBPACK_IMPORTED_MODULE_0__api_api__["a" /* default */].ADD_ORDER_API, {
            TOKEN: TOKEN,
            shopId: shopId,
            list: shopInfo.list,
            pay: shopInfo.allPrice
        }).then(function (data) {
            console.log('成功');
            if (data.data.code === 0) {
                //生成订单成功
                // console.log(data.data);
                context.commit('finishOrder', { shopId: data.data.data.shopId });
            } else {
                console.log('失败');
            }
        }).catch(function (error) {
            console.log('失败');
            console.log(error);
        });
    }
};

/* harmony default export */ __webpack_exports__["a"] = ({
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions
});

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// 评价
var state = {};

var mutations = {};

var actions = {};

/* harmony default export */ __webpack_exports__["a"] = ({
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions
});

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var HOST = 'http://localhost:7000';
// const HOST = 'https://www.littleemmayang.com';

//城市列表
// method: GET
var CITY_LIST_API = HOST + '/meituan/address/city/list';

// 搜索地址
// method: GET
// params: city(Y) keyword(Y)
var ADDRESS_API = HOST + '/meituan/address/search';

//首页分类
// method: GET
var CATEGORY_API = HOST + '/meituan/home/category';

// 店铺列表
// method: GET
// params: page(N, 1) count(N, 12) longitude(Y) latitude(Y) category(N, '')
var SHOP_LIST_API = HOST + '/meituan/shop/list';

// 店铺头部信息
// method: GET
// params: id(Y)
var SHOP_HEADER_API = HOST + '/meituan/shop/header';

// 店铺详情
// method: GET
// params: id(Y)
var SHOP_DETAIL_API = HOST + '/meituan/shop/detail';

// 店铺评价
// method: GET
// params: id(Y)
var SHOP_COMMENT_API = HOST + '/meituan/shop/comment';

// 店铺信息
// method: GET
// params: id(Y)
var SHOP_INFO_API = HOST + '/meituan/shop/info';

// 生成订单
// method： POST
// params： TOKEN，shopId, list, pay
var ADD_ORDER_API = HOST + '/meituan/order/add';

/* harmony default export */ __webpack_exports__["a"] = ({
  CITY_LIST_API: CITY_LIST_API,
  ADDRESS_API: ADDRESS_API,
  CATEGORY_API: CATEGORY_API,
  SHOP_LIST_API: SHOP_LIST_API,
  SHOP_HEADER_API: SHOP_HEADER_API,
  SHOP_DETAIL_API: SHOP_DETAIL_API,
  SHOP_COMMENT_API: SHOP_COMMENT_API,
  SHOP_INFO_API: SHOP_INFO_API,
  ADD_ORDER_API: ADD_ORDER_API
});

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise__);

// 封装请求
function get(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: function success(res) {
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          reject({
            code: res.statusCode,
            message: '请求失败'
          });
        }
      },
      fail: function fail(res) {
        reject({
          code: -1,
          message: '请求失败'
        });
      }
    });
  });
}

function post(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  return new __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_promise___default.a(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      header: {},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function success(res) {
        if (res.statusCode === 200) {
          resolve(res);
        } else {
          reject({
            code: res.statusCode,
            message: '请求失败'
          });
        }
      },
      fail: function fail(res) {
        reject({
          code: -1,
          message: '请求失败'
        });
      }
    });
  });
}

/* harmony default export */ __webpack_exports__["a"] = ({
  get: get,
  post: post
});

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__index__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store__ = __webpack_require__(89);




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.mixin({
    created: function created() {
        this.$store = __WEBPACK_IMPORTED_MODULE_2__store__["a" /* default */];
    }
});

new __WEBPACK_IMPORTED_MODULE_0_vue___default.a(__WEBPACK_IMPORTED_MODULE_1__index__["a" /* default */]).$mount();

/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_c6eb783a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(88);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(55)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-c6eb783a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_c6eb783a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/pages/detail/index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c6eb783a", Component.options)
  } else {
    hotAPI.reload("data-v-c6eb783a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 55:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_menu__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_comment__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_info__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_cart__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_card__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vuex__ = __webpack_require__(9);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["a"] = ({
    components: {
        'shop-menu': __WEBPACK_IMPORTED_MODULE_1__components_menu__["a" /* default */],
        'shop-comment': __WEBPACK_IMPORTED_MODULE_2__components_comment__["a" /* default */],
        'shop-info': __WEBPACK_IMPORTED_MODULE_3__components_info__["a" /* default */],
        'shop-cart': __WEBPACK_IMPORTED_MODULE_4__components_cart__["a" /* default */],
        'shop-card': __WEBPACK_IMPORTED_MODULE_5__components_card__["a" /* default */]
    },
    data: function data() {
        return {
            navList: ['菜单', '评价', '商家'],
            selectNavIndex: 0,
            showCard: false
        };
    },

    computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_6_vuex__["b" /* mapState */])({
        headerData: function headerData(state) {
            return state.info.shopHeaderData;
        }
    })),
    methods: {
        // nav点击的切换
        selectNavAction: function selectNavAction(index) {
            this.selectNavIndex = index;
        },

        // 轮播视图切换的事件
        changeSwiperAction: function changeSwiperAction(_ref) {
            var mp = _ref.mp;

            this.selectNavIndex = mp.detail.current;
        },

        // 切换商家信息卡片的事件
        triggerCardAction: function triggerCardAction() {
            this.showCard = !this.showCard;
        }
    },
    mounted: function mounted() {
        // 取得详情页面的参数
        var _$root$$mp$query = this.$root.$mp.query,
            name = _$root$$mp$query.name,
            id = _$root$$mp$query.id;
        // 设置标题

        wx.setNavigationBarTitle({ title: name });
        // 根据id请求商家数据
        this.$store.dispatch('info/getShopHeaderData', { id: id });
        // 请求商家的菜单数据
        this.$store.dispatch('menu/getShopMenuData', { id: id });
    }
});

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_menu_vue__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_078e2ff8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_menu_vue__ = __webpack_require__(71);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(69)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_menu_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_078e2ff8_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_menu_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/menu.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] menu.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-078e2ff8", Component.options)
  } else {
    hotAPI.reload("data-v-078e2ff8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 69:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(9);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            selectIndex: 0,
            scrollTop: 0
        };
    },

    computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapState */])({
        nav: function nav(state) {
            return state.menu.menuNav;
        },
        list: function list(state) {
            return state.menu.menuList;
        }
    }), {
        heightArr: function heightArr() {
            var heightArr = this.list.map(function (item) {
                return item.length * 100 + 30;
            });
            console.log(heightArr);
            return heightArr;
        }
    }),
    methods: {
        // 菜单导航的点击事件
        selectMenuAction: function selectMenuAction(index) {
            // 设置选中的菜单
            this.selectIndex = index;
            /*
            // 方式1:
            // 计算高度，滚动到对应位置
            let height = 0;
            for(let i = 0; i < index; i++){
                height += this.heightArr[i];
            }
            this.scrollTop = height;
            */
            // 方式2
            // 切换scroll-into-view
        },

        // 菜单的滚动事件
        menuListScrollAction: function menuListScrollAction(ev) {
            var top = ev.mp.detail.scrollTop;

            /*
             [1030, 630, 330, 330, 2130, 930, 2130, 530, 330, 630, 330, 230]
             
             0~1030    0
             1030~1030+630 1
             ...
            */

            var index = 0;
            if (top >= 0) {
                for (var i = 0; i < this.heightArr.length; i++) {
                    var min = 0;
                    for (var j = 0; j < i; j++) {
                        min += this.heightArr[j];
                    }
                    var max = 0;
                    if (i === this.heightArr.length - 1) {
                        //    return;
                        index = this.heightArr.length - 1;
                    } else {
                        max = min + this.heightArr[i];
                        //    console.log(min, max);
                        if (top >= min && top < max) {
                            index = i;
                            break;
                        }
                    }
                }
            }
            this.selectIndex = index;
        },


        // 将商品添加到购物车
        addGoodAction: function addGoodAction(item) {
            var id = this.$root.$mp.query.id;


            this.$store.commit('cart/addGoods', {
                shopId: id,
                goodsId: item.spuId,
                price: item.currentPrice,
                name: item.spuName
            });
        }
    }
});

/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "menu"
  }, [_c('div', {
    staticClass: "menu-wrap"
  }, [_c('scroll-view', {
    staticClass: "menu-nav",
    attrs: {
      "scroll-y": true,
      "scroll-into-view": 'nav' + _vm.selectIndex
    }
  }, _vm._l((_vm.nav), function(item, index) {
    return _c('li', {
      key: item.tag,
      staticClass: "nav-item",
      class: {
        active: _vm.selectIndex === index
      },
      attrs: {
        "id": 'nav' + index,
        "eventid": '0_' + index
      },
      on: {
        "click": function($event) {
          _vm.selectMenuAction(index)
        }
      }
    }, [(item.icon) ? _c('image', {
      attrs: {
        "src": item.icon
      }
    }) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(item.name))])])
  })), _vm._v(" "), _c('scroll-view', {
    staticClass: "menu-list",
    attrs: {
      "scroll-y": true,
      "scrollTop": _vm.scrollTop,
      "scroll-into-view": 'group' + _vm.selectIndex,
      "eventid": '2'
    },
    on: {
      "scroll": _vm.menuListScrollAction
    }
  }, _vm._l((_vm.list), function(menu, index) {
    return _c('div', {
      key: index,
      attrs: {
        "id": 'group' + index
      }
    }, [_c('h3', {
      staticClass: "group-title"
    }, [_vm._v(_vm._s(_vm.nav[index].name))]), _vm._v(" "), _c('ul', _vm._l((menu), function(item, j) {
      return _c('li', {
        key: item.spuId,
        staticClass: "menu-item"
      }, [_c('image', {
        staticClass: "pic",
        attrs: {
          "mode": "aspectFill",
          "src": item.littleImageUrl
        }
      }), _vm._v(" "), _c('div', {
        staticClass: "content"
      }, [_c('h4', {
        staticClass: "title"
      }, [_vm._v(_vm._s(item.spuName))]), _vm._v(" "), _c('div', {
        staticClass: "add-btn",
        attrs: {
          "eventid": '1_' + index + '-' + j
        },
        on: {
          "click": function($event) {
            _vm.addGoodAction(item)
          }
        }
      }, [_vm._v("添加")])], 1)])
    }))], 1)
  }))], 1), _vm._v(" "), _c('div', {
    staticClass: "tools"
  })])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-078e2ff8", esExports)
  }
}

/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_comment_vue__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_cee7aa6c_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_comment_vue__ = __webpack_require__(75);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(73)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_comment_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_cee7aa6c_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_comment_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/comment.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] comment.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cee7aa6c", Component.options)
  } else {
    hotAPI.reload("data-v-cee7aa6c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 73:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 74:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({});

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._v("\n    评价\n")])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-cee7aa6c", esExports)
  }
}

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_info_vue__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_2ad0f7d3_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_info_vue__ = __webpack_require__(79);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(77)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_info_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_2ad0f7d3_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_info_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/info.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] info.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2ad0f7d3", Component.options)
  } else {
    hotAPI.reload("data-v-2ad0f7d3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 77:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({});

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._v("\n    商家\n")])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2ad0f7d3", esExports)
  }
}

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_cart_vue__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_20998545_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_cart_vue__ = __webpack_require__(83);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(81)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-20998545"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_cart_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_20998545_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_cart_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/cart.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] cart.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-20998545", Component.options)
  } else {
    hotAPI.reload("data-v-20998545", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 81:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(9);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            isShow: false
        };
    },

    computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapState */])({
        currentCartData: function currentCartData(state) {
            return state.cart.cartList;
        }
    }), {
        allPrice: function allPrice() {
            var id = this.$root.$mp.query.id;

            var shopInfo = this.currentCartData.find(function (shopInfo) {
                return shopInfo.shopId === id;
            });
            if (shopInfo) {
                return shopInfo.allPrice; //shopId,list,allPrice
            } else {
                return 0;
            }
        },
        list: function list() {
            var id = this.$root.$mp.query.id;

            var shopInfo = this.currentCartData.find(function (shopInfo) {
                return shopInfo.shopId === id;
            });
            if (shopInfo) {
                return shopInfo.list; //shopId,list,allPrice
            } else {
                return [];
            }
        }
    }),
    methods: {
        showListAction: function showListAction() {
            this.isShow = !this.isShow;
        },
        add: function add(item) {
            var id = this.$root.$mp.query.id;

            var info = {
                shopId: id,
                goodsId: item.goodsId
            };
            this.$store.commit('cart/addGoods', info);
        },
        reduce: function reduce(item) {
            if (item.count === 1) {
                wx.showToast({ title: '不能再少了', icon: 'none' });
                return;
            }
            var id = this.$root.$mp.query.id;

            var info = {
                shopId: id,
                goodsId: item.goodsId
            };
            this.$store.commit('cart/reduceGoods', info);
        },
        deleteA: function deleteA(item) {
            var id = this.$root.$mp.query.id;

            var info = {
                shopId: id,
                goodsId: item.goodsId
            };
            this.$store.commit('cart/deleteGoods', info);
        },
        payAction: function payAction() {
            var _this = this;

            console.log('结算');
            //进行结算
            var id = this.$root.$mp.query.id;

            this.$store.dispatch('cart/payAction', {
                shopId: id,
                TOKEN: wx.getStorageSync('TOKEN')
            });

            // 监听是否生成订单
            this.$watch('list', function (newVal) {
                console.log(newVal);
                if (newVal.length === 0) {
                    _this.isShow = false;
                    wx.navigateBack();
                }
            });
        }
    }
});

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "cart"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isShow),
      expression: "isShow"
    }],
    staticClass: "cover",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.showListAction
    }
  }), _vm._v(" "), _c('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isShow),
      expression: "isShow"
    }],
    staticClass: "cart-list"
  }, _vm._l((_vm.list), function(item, index) {
    return _c('li', {
      key: item.goodsId
    }, [_c('button', {
      attrs: {
        "eventid": '1_' + index
      },
      on: {
        "click": function($event) {
          _vm.reduce(item)
        }
      }
    }, [_vm._v("-")]), _vm._v("\n            " + _vm._s(item.name) + "---" + _vm._s(item.count) + "\n            "), _c('button', {
      attrs: {
        "eventid": '2_' + index
      },
      on: {
        "click": function($event) {
          _vm.add(item)
        }
      }
    }, [_vm._v("+")]), _vm._v(" "), _c('button', {
      attrs: {
        "eventid": '3_' + index
      },
      on: {
        "click": function($event) {
          _vm.deleteA(item)
        }
      }
    }, [_vm._v("删除")])], 1)
  })), _vm._v(" "), _c('div', {
    staticClass: "cart-bar"
  }, [_c('div', {
    attrs: {
      "eventid": '4'
    },
    on: {
      "click": function($event) {
        _vm.showListAction()
      }
    }
  }, [_vm._v("总价：" + _vm._s(_vm.allPrice))]), _vm._v(" "), _c('div', {
    attrs: {
      "eventid": '5'
    },
    on: {
      "click": _vm.payAction
    }
  }, [_vm._v("结算")])])], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-20998545", esExports)
  }
}

/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_card_vue__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_1fb80d35_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_card_vue__ = __webpack_require__(87);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(85)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1fb80d35"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_card_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_1fb80d35_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_card_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/components/card.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] card.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1fb80d35", Component.options)
  } else {
    hotAPI.reload("data-v-1fb80d35", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 85:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(9);

//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
    computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, Object(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* mapState */])({
        headerData: function headerData(state) {
            return state.info.shopHeaderData;
        }
    })),
    methods: {
        closeAction: function closeAction() {
            this.$emit('close');
        },
        testAction: function testAction() {}
    }
});

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "card",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.closeAction
    }
  }, [_c('div', {
    staticClass: "card-wrap"
  }, [_c('div', {
    staticClass: "card-content",
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": function($event) {
        $event.stopPropagation();
        _vm.testAction($event)
      }
    }
  }, [_c('div', [_vm._v(_vm._s(_vm.headerData.name))])]), _vm._v(" "), _c('div', {
    staticClass: "cancel"
  })])])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1fb80d35", esExports)
  }
}

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('header', {
    staticClass: "header"
  }, [_c('image', {
    staticClass: "shop-icon",
    attrs: {
      "mode": "aspectFill",
      "src": _vm.headerData.picUrl
    }
  }), _vm._v(" "), _c('span', {
    attrs: {
      "eventid": '0'
    },
    on: {
      "click": _vm.triggerCardAction
    }
  }, [_vm._v("显示")])]), _vm._v(" "), _c('nav', {
    staticClass: "nav"
  }, [_vm._l((_vm.navList), function(item, index) {
    return _c('li', {
      key: item,
      staticClass: "nav-item",
      class: {
        active: _vm.selectNavIndex === index
      },
      attrs: {
        "eventid": '1_' + index
      },
      on: {
        "click": function($event) {
          _vm.selectNavAction(index)
        }
      }
    }, [_vm._v("\n            " + _vm._s(item) + "\n        ")])
  }), _vm._v(" "), _c('div')], 2), _vm._v(" "), _c('swiper', {
    staticClass: "swiper",
    attrs: {
      "current": _vm.selectNavIndex,
      "eventid": '2'
    },
    on: {
      "change": _vm.changeSwiperAction
    }
  }, [_c('swiper-item', {
    attrs: {
      "mpcomid": '1'
    }
  }, [_c('shop-menu', {
    attrs: {
      "mpcomid": '0'
    }
  })], 1), _vm._v(" "), _c('swiper-item', {
    attrs: {
      "mpcomid": '3'
    }
  }, [_c('shop-comment', {
    attrs: {
      "mpcomid": '2'
    }
  })], 1), _vm._v(" "), _c('swiper-item', {
    attrs: {
      "mpcomid": '5'
    }
  }, [_c('shop-info', {
    attrs: {
      "mpcomid": '4'
    }
  })], 1)], 1), _vm._v(" "), _c('shop-cart', {
    attrs: {
      "mpcomid": '6'
    }
  }), _vm._v(" "), (_vm.showCard) ? _c('shop-card', {
    attrs: {
      "eventid": '3',
      "mpcomid": '7'
    },
    on: {
      "close": _vm.triggerCardAction
    }
  }) : _vm._e()], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c6eb783a", esExports)
  }
}

/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__info__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cart__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__comment__ = __webpack_require__(122);


__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);






var store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
    modules: {
        info: __WEBPACK_IMPORTED_MODULE_2__info__["a" /* default */],
        menu: __WEBPACK_IMPORTED_MODULE_3__menu__["a" /* default */],
        cart: __WEBPACK_IMPORTED_MODULE_4__cart__["a" /* default */],
        comment: __WEBPACK_IMPORTED_MODULE_5__comment__["a" /* default */]
    }
});

/* harmony default export */ __webpack_exports__["a"] = (store);

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_api__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api_request__ = __webpack_require__(29);



// 商家信息


var state = {
    shopHeaderData: {}
};

var mutations = {
    setShopHeaderData: function setShopHeaderData(state, params) {
        state.shopHeaderData = params;
    }
};

var actions = {
    // 获得店铺信息
    getShopHeaderData: function getShopHeaderData(context, params) {
        var _this = this;

        return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
            var data, infoData, newData;
            return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            _context.next = 3;
                            return __WEBPACK_IMPORTED_MODULE_4__api_request__["a" /* default */].get(__WEBPACK_IMPORTED_MODULE_3__api_api__["a" /* default */].SHOP_HEADER_API, { id: params.id });

                        case 3:
                            data = _context.sent;
                            infoData = data.data.data;
                            newData = {
                                name: infoData.shopName,
                                picUrl: infoData.shopPic,
                                deliveryTime: infoData.deliveryTime,
                                bulletin: infoData.bulletin,
                                watcher: infoData.watcher,
                                activityList: infoData.activityList,
                                shipping_time: infoData.shipping_time,
                                minFee: infoData.minFee,
                                deliveryFee: infoData.deliveryFee
                            };

                            context.commit('setShopHeaderData', newData);
                            _context.next = 12;
                            break;

                        case 9:
                            _context.prev = 9;
                            _context.t0 = _context['catch'](0);
                            return _context.abrupt('return', __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_promise___default.a.reject(_context.t0.message));

                        case 12:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this, [[0, 9]]);
        }))();
    }
};

/* harmony default export */ __webpack_exports__["a"] = ({
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions
});

/***/ })

},[53]);