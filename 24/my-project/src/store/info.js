// 商家信息
import api from '../api/api'
import request from '../api/request'
const state = {
    shopHeaderData: {}
}

const mutations = {
    setShopHeaderData(state, params){
        state.shopHeaderData = params;
    }
}

const actions = {
    // 获得店铺信息
    async getShopHeaderData(context, params){
        try {
            // 发送请求
            let data = await request.get(api.SHOP_HEADER_API, {id: params.id});
            let infoData = data.data.data;
            let newData = {
                name: infoData.shopName,
                picUrl: infoData.shopPic,
                deliveryTime: infoData.deliveryTime,
                bulletin:infoData.bulletin,
                watcher: infoData.watcher,
                activityList: infoData.activityList,
                shipping_time: infoData.shipping_time,
                minFee: infoData.minFee,
                deliveryFee: infoData.deliveryFee
            }
            context.commit('setShopHeaderData', newData);
        } catch (error) {
            return Promise.reject(error.message);
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}