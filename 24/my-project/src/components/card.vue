<template>
<div class="card" @click="closeAction">

    <div class="card-wrap">
        <div class="card-content" @click.stop="testAction">
            <div>{{headerData.name}}</div>
            
        </div>
        <div class="cancel"></div>
    </div>

</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    computed: {
        ...mapState({
            headerData: state=>state.info.shopHeaderData
        })
    },
    methods: {
        closeAction(){
            this.$emit('close');
        },
        testAction(){

        }
    }
}
</script>

<style scoped>
.card{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
}
.card-wrap{
    width: 600rpx;
    height: 800rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.card-content{
    width: 600rpx;
    height: 700rpx;
    border-radius: 10px;
    background: #fff;
}
.cancel{
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    background: rebeccapurple;
    margin: 0 auto;
}
</style>
