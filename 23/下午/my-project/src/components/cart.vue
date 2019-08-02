<template>
<div class="cart">
    <div class="cover" v-show="isShow" @click="showListAction"></div>
    <ul class="cart-list" v-show="isShow">
        <li v-for="item in list" :key="item.goodsId">
            {{item.name}}---{{item.count}}
        </li>
    </ul>
    <div class="cart-bar">
        <div @click="showListAction()">总价：{{allPrice}}</div>
        <div>结算</div>
    </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            isShow: false
        }
    },
    computed: {
        ...mapState({
            currentCartData: state => state.cart.cartList
        }),
        allPrice(){
            let {id} = this.$root.$mp.query;
            let shopInfo = this.currentCartData.find(shopInfo=>{
                return shopInfo.shopId === id
            })
            if(shopInfo){
                return shopInfo.allPrice;//shopId,list,allPrice
            }
            else{
                return 0;
            } 
        },
        list(){
            let {id} = this.$root.$mp.query;
            let shopInfo = this.currentCartData.find(shopInfo=>{
                return shopInfo.shopId === id
            })
            if(shopInfo){
                return shopInfo.list;//shopId,list,allPrice
            }
            else{
                return [];
            } 
        }
    },
    methods: {
        showListAction(){
            this.isShow = !this.isShow;
        },

    }
}
</script>

<style scoped>
.cart{
    
}
.cover{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
}
.cart-list{
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 45px;
    width: 100%;
}
.cart-bar{
    background: palevioletred;
    width: 100%;
    height: 45px;
    left: 0;
    bottom: 0;
    position: absolute;
}
</style>
