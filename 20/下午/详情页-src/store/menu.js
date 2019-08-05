// 菜单
import api from '../api/api'
import request from '../api/request'
const state = {
    menuNav: [],
    menuList: []
}

const mutations = {
    setShopMenuData(state, params){
        state.menuNav = params.menuNav;
        state.menuList = params.menuList;
    }
}

const actions = {
    // 请求商家菜单数据
    async getShopMenuData(context, params){
        try {
            // 发送请求
            let data = await request.get(api.SHOP_DETAIL_API, {id: params.id});
            let categoryList = data.data.data.categoryList;
            // 获得菜单导航栏数据
            let menuNav = categoryList.map(item=>{
                return {
                    name: item.categoryName,
                    icon: item.iconUrl,
                    tag: item.tag
                }
            })
             // 获得菜单数据
             let menuList = categoryList.map(item=>item.spuList);
            //  设置数据
             context.commit('setShopMenuData', {menuNav, menuList});
             console.log(menuList);
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