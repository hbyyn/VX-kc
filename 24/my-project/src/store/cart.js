import api from '../api/api'
import request from '../api/request'
// 购物车
const state = {
    cartList: wx.getStorageSync('cart') || []
}

const saveData = (cartList)=>{
    wx.setStorage({
        key: 'cart',
        data: cartList
    })
}

const getCountPrice = (shopInfo)=>{
    let price = 0;
    shopInfo.list.forEach(goods=>{
        price += goods.price * goods.count;
    })
    //计算折扣
    return price;
}

const mutations = {
    //商品数量+1
    addGoods(state, params/*shopid, goodsid*/){
        let {shopId, goodsId, price, name} = params;
        let shopInfo = state.cartList.find(item=>{
            return item.shopId === shopId
        })
        if(shopInfo){
            //已经商家
            let goodsInfo = shopInfo.list.find(item=>item.goodsId === goodsId);
            if(goodsInfo){
                //商品已经添加过
                goodsInfo.count += 1;
                //计算价格
                shopInfo.allPrice = getCountPrice(shopInfo);
                saveData(state.cartList);//保存数据
            }else{
                //没有添加商品，需要添加商品
                shopInfo.list.push({goodsId, count: 1, price, name});
                //计算价格
                shopInfo.allPrice = getCountPrice(shopInfo);
                saveData(state.cartList);//保存数据
            }
        }else{
            //第一次添加商家，和商品
            let shopInfo = {
                shopId,
                list: [{goodsId, count: 1, price, name}],
                allPrice: 0
            };
            state.cartList.push(shopInfo);
            //计算价格
            shopInfo.allPrice = getCountPrice(shopInfo);
            saveData(state.cartList);//保存数据
        }
    },
    //商品数量-1
    reduceGoods(state, params/*shopid, goodsid*/){
        let {shopId, goodsId} = params;
        // 查找商家
        let shopInfo = state.cartList.find(shopInfo=>shopInfo.shopId===shopId);
        // 查找商品
        let goodsInfo = shopInfo.list.find(item=>item.goodsId === goodsId);
        //减商品数量
        goodsInfo.count--;
        // 计算价格
        shopInfo.allPrice = getCountPrice(shopInfo);
        saveData(state.cartList);//保存数据
    },
    // 删除商品
    deleteGoods(state, params/*shopid, goodsid*/){
        let {shopId, goodsId} = params;
        // 查找商家
        let shopInfo = state.cartList.find(shopInfo=>shopInfo.shopId===shopId);
        // 查找商品的位置
        let index = shopInfo.list.findIndex(item=>item.goodsId === goodsId);
        // 删除商品
        shopInfo.list.splice(index, 1);
        shopInfo.allPrice = getCountPrice(shopInfo);
        saveData(state.cartList);//保存数据
    },
    finishOrder(state, params){
        let {shopId} = params;
        state.cartList = state.cartList.filter(item=>{
            return item.shopId !== shopId
        });
        saveData(state.cartList);
    }
}


const actions = {
    payAction(context, params){
        let {shopId, TOKEN} = params;
        // 获得该商家的购物车数据
        let shopInfo = state.cartList.find(shopInfo=>shopInfo.shopId===shopId);
        request.post(api.ADD_ORDER_API, {
            TOKEN,
            shopId,
            list: shopInfo.list,
            pay: shopInfo.allPrice
        }).then((data)=>{
            console.log('成功');
            if(data.data.code === 0){
                //生成订单成功
                // console.log(data.data);
                context.commit('finishOrder', {shopId: data.data.data.shopId});

            }else{
                console.log('失败');                
            }
        })
        .catch(error=>{
            console.log('失败');
            console.log(error);
        })
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}