<template>
    <div class="menu">
        <div class="menu-wrap">
            <!-- 菜单导航 -->
            <scroll-view class="menu-nav" :scroll-y="true"
                :scroll-into-view="'nav'+selectIndex">
                <li v-for="(item, index) in nav" :key="item.tag" 
                    :id="'nav'+index"
                    class="nav-item"
                    :class="{active: selectIndex===index}"
                    @click="selectMenuAction(index)">
                    <image v-if="item.icon" :src="item.icon"></image>
                    <span>{{item.name}}</span>
                </li>
            </scroll-view>
            <!-- 菜单内容 -->
            <scroll-view class="menu-list" :scroll-y="true"
                :scrollTop="scrollTop"
                :scroll-into-view="'group'+selectIndex"
                @scroll="menuListScrollAction"
                >
                <div v-for="(menu, index) in list" :key="index" :id="'group'+index">
                    <h3 class="group-title">{{nav[index].name}}</h3>
                    <ul>
                        <li v-for="(item, j) in menu" :key="item.spuId" class="menu-item">
                            <image class="pic" mode="aspectFill" :src="item.littleImageUrl"></image>
                            <div class="content">
                                <h4 class="title">{{item.spuName}}</h4>

                            </div>
                        </li>
                    </ul>
                </div>
            </scroll-view>
        </div>
        <div class="tools">
            
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data(){
        return {
            selectIndex: 0,
            scrollTop: 0
        }
    },
    computed: {
        ...mapState({
            nav: state=>state.menu.menuNav,
            list: state=>state.menu.menuList,
        }),
        heightArr(){
            let heightArr = this.list.map(item=>{
                return item.length*100+30;
            })
            console.log(heightArr);
            return heightArr;
        }
    },
    methods: {
        // 菜单导航的点击事件
        selectMenuAction(index){
            // 设置选中的菜单
            this.selectIndex = index;
            /*
            // 方式1:
            // 计算高度，滚动到对应位置
            let height = 0;
            for(let i = 0; i < index; i++){
                height += this.heightArr[i];
            }
            this.scrollTop = height;
            */
            // 方式2
            // 切换scroll-into-view

        },
        // 菜单的滚动事件
        menuListScrollAction(ev){
            let top = ev.mp.detail.scrollTop;
            
            /*
             [1030, 630, 330, 330, 2130, 930, 2130, 530, 330, 630, 330, 230]
             
             0~1030    0
             1030~1030+630 1
             ...
            */
           
           let index = 0;
           if(top >= 0){
            for(let i = 0; i < this.heightArr.length; i++){
                let min = 0;
                for(let j = 0; j < i; j++){
                    min += this.heightArr[j];
                }
                let max = 0;
                if(i === this.heightArr.length - 1){
                    //    return;
                    index = this.heightArr.length - 1;
                }else{
                    max = min + this.heightArr[i];
                    //    console.log(min, max);
                    if( top>= min && top < max){
                        index = i;
                        break;
                    }
                }
            }
           }
           this.selectIndex = index;
        }
    },
    mounted(){
        // 请求商家的菜单数据
        let {id} = this.$root.$mp.query;
        this.$store.dispatch('menu/getShopMenuData', {id});
    }
}
</script>

<style scooped>
.menu-wrap{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 45px;
    display: flex;
}
.menu-nav{
    width: 100px;
    height: 100%;
    font-size: 12px;
    color: #999;
    background: #efefef;
}
.nav-item{
    padding: 12px 5px;
}
.nav-item.active{
    background: #fff;
}
.menu-nav image{
    width: 12px;
    height: 12px;
}
.menu-list{
    flex: 1;
    height: 100%;
    margin: 0 10px;
}
.group-title{
    height: 30px;
    line-height: 30px;
    color: #666;
    font-size: 12px;
    background: #ddd;
}
.menu-item{
    display: flex;
    height: 80px;
    padding: 10px 0;
}
.menu-item .pic{
    width: 80px;
    height: 80px;
}
.menu-item .content{
    margin-left: 5px;
    flex: 1;
}
.menu-item .content .title{
    font-size: 14px;
    color: #222;
    font-weight: bold;
}
.tools{
    width: 100%;
    height: 45px;
    position: absolute;
    left: 0;
    bottom: 0;
    background: palegoldenrod;
}
</style>
