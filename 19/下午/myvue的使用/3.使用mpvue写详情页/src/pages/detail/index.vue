<template>
    <div>
        <header class="header">

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

    </div>
</template>

<script>
import menu from '../../components/menu'
import comment from '../../components/comment'
import info from '../../components/info'
export default {
    components: {
        'shop-menu': menu,
        'shop-comment': comment,
        'shop-info': info
    },
    data(){
        return {
            navList: ['菜单', '评价', '商家'],
            selectNavIndex: 0
        }
    },
    methods: {
        // nav点击的切换
        selectNavAction(index){
            this.selectNavIndex = index;
        },
        // 轮播视图切换的事件
        changeSwiperAction( {mp} ){
            this.selectNavIndex = mp.detail.current;
        }
    }
}
</script>

<style scoped>
.header{
    width: 100%;
    height: 100px;
    background: #333;
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
