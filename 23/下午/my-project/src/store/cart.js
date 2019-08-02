// 购物车
const state = {
    cartList: [
    ]
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
            }else{
                //没有添加商品，需要添加商品
                shopInfo.list.push({goodsId, count: 1, price, name});
                //计算价格
                shopInfo.allPrice = getCountPrice(shopInfo);
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
        }
    },
    //商品数量-1
    reduceGoods(state, params/*shopid, goodsid*/){

    },
    // 删除商品
    deleteGoods(state, params/*shopid, goodsid*/){

    }
}



export default {
    namespaced: true,
    state,
    mutations
}