import Vue from 'vue'
import App from './App'

App.mpType = 'app';

import store from './store'
Vue.mixin({
    created(){
        this.$store = store;
    }
})

new Vue(App).$mount();