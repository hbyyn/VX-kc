<template>
    <div>
        <header class="header">
            <image class="shop-icon" mode="aspectFill" :src="headerData.picUrl"></image>
            <span @click="triggerCardAction">显示</span>
        </header>
        <nav class="nav">
            <li v-for="(item, index) in navList" :key="item"
                class="nav-item"
                :class="{active: selectNavIndex === index}"
                @click="selectNavAction(index)">
                {{item}}
            </li>
            <div></div>
        </nav>
        
        <swiper class="swiper" :current="selectNavIndex" @change="changeSwiperAction">
            <swiper-item>
                <shop-menu></shop-menu>
            </swiper-item>
            <swiper-item>
                <shop-comment></shop-comment>
            </swiper-item>
            <swiper-item>
                <shop-info></shop-info>
            </swiper-item>
        </swiper>

        <!-- <shop-cart/> -->

        <shop-card v-if="showCard" @close="triggerCardAction"/>

    </div>
</template>

<script>
import menu from '../../components/menu'
import comment from '../../components/comment'
import info from '../../components/info'
import cart from '../../components/cart'
import card from '../../components/card'
import {mapState} from 'vuex'
export default {
    components: {
        'shop-menu': menu,
        'shop-comment': comment,
        'shop-info': info,
        'shop-cart': cart,
        'shop-card': card
    },
    data(){
        return {
            navList: ['菜单', '评价', '商家'],
            selectNavIndex: 0,
            showCard: false
        }
    },
    computed: {
        ...mapState({
            headerData: state=>state.info.shopHeaderData
        })
    },
    methods: {
        // nav点击的切换
        selectNavAction(index){
            this.selectNavIndex = index;
        },
        // 轮播视图切换的事件
        changeSwiperAction( {mp} ){
            this.selectNavIndex = mp.detail.current;
        },
        // 切换商家信息卡片的事件
        triggerCardAction(){
            this.showCard = !this.showCard;
        }
    },
    mounted(){
        // 取得详情页面的参数
        let {name, id} = this.$root.$mp.query;
        // 设置标题
        wx.setNavigationBarTitle({title: name});
        // 根据id请求商家数据
        this.$store.dispatch('info/getShopHeaderData', {id});
    }
}
</script>

<style scoped>
.header{
    width: 100%;
    height: 100px;
    background: #333;
}
.header .shop-icon{
    width: 85px;
    height: 85px;
}
.nav{
    width: 100%;
    height: 40px;
}
.nav .nav-item{
    float: left;
}
.nav .nav-item.active{
    color: red;
}
.swiper{
    width: 100%;
    position: absolute;
    top: 140px;
    left: 0;
    bottom: 0;
    background: papayawhip;
    height: auto;
}

</style>
