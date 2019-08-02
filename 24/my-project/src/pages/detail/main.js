import Vue from 'vue'
import Detail from './index'

import store from '../../store'
Vue.mixin({
    created(){
        this.$store = store;
    }
})


new Vue(Detail).$mount();