<script>
// app.js
export default {
    onLaunch(){
        console.log('App onLaunch');
    },
    onShow(options){
        console.log('App show');
    },

    onHide(){
        console.log('app hide');
    },

    mounted(){
        console.log('App mounted');
        setTimeout(() => {
            console.log(this.$root.$mp.appOptions);
        }, 2000);
    }

}
</script>

<style>
/* app.wxss */

</style>
