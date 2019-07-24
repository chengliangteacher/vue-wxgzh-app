<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
 
<script>
export default {
    watch: {
        $route() {
            this.getOpenId();
        }
    },
    created() {
        this.getOpenId();
    },
    methods: {
        getOpenId() {
            if (this.$route.query.openid) {
                sessionStorage.openid = this.$route.query.openid;
            }
        }
    }
};
</script>

 

<style lang="scss">
#app {
    height: 100vh;
}
</style>
