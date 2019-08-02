<template>
<div class="cart">
    <div class="cover" v-show="isShow" @click="showListAction"></div>
    <ul class="cart-list" v-show="isShow">
        <li v-for="item in list" :key="item.goodsId">
            <button @click="reduce(item)">-</button>
            {{item.name}}---{{item.count}}
            <button @click="add(item)">+</button>
            <button @click="deleteA(item)">删除</button>
        </li>
    </ul>
    <div class="cart-bar">
        <div @click="showListAction()">总价：{{allPrice}}</div>
        <div @click="payAction">结算</div>
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
        add(item){
            let {id} = this.$root.$mp.query;
            let info = {
                shopId: id,
                goodsId: item.goodsId
            }
            this.$store.commit('cart/addGoods', info);
        },
        reduce(item){
            if(item.count === 1){
                wx.showToast({title:'不能再少了', icon: 'none'});
                return;
            }
           let {id} = this.$root.$mp.query;
            let info = {
                shopId: id,
                goodsId: item.goodsId
            }
            this.$store.commit('cart/reduceGoods', info);
        },
        deleteA(item){
            let {id} = this.$root.$mp.query;
            let info = {
                shopId: id,
                goodsId: item.goodsId
            }
            this.$store.commit('cart/deleteGoods', info);
        },
        payAction(){
            console.log('结算');
            //进行结算
           let {id} = this.$root.$mp.query;
            this.$store.dispatch('cart/payAction', {
                shopId: id,
                TOKEN: wx.getStorageSync('TOKEN')
            });

            // 监听是否生成订单
            this.$watch('list', (newVal)=>{
                console.log(newVal)
                if(newVal.length === 0){
                    this.isShow = false;
                    wx.navigateBack();
                }
            })

        }


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
button{
    display: inline-block;
}
</style>
