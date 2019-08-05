import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import info from './info'
import menu from './menu'
import cart from './cart'
import comment from './comment'

const store = new Vuex.Store({
    modules: {
        info,
        menu,
        cart,
        comment
    }
});

export default store;