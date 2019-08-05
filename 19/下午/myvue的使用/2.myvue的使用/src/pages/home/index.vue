<template>
    <div>
        首页
        <div :class="classObj"></div>

        <input type="checkbox">

        <checkbox/>

    </div>
</template>

<script>
export default {
    data(){
        return {
            classObj: ['red', 'blue']
        }
    }
}
</script>

<style>

</style>
