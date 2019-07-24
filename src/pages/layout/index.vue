<template>
    <div class="layout-container">
        <s-header></s-header>
        <div class="s-content">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
        <s-tabs></s-tabs>
    </div>
</template>
<script>
import header from "@/pages/layout/header/header.vue";
import tabs from "@/pages/layout/tabs/tabs.vue";
export default {
    components: {
        "s-header": header,
        "s-tabs": tabs
    },
    data() {
        return {
            isnoetabs: 0
        };
    },
    watch: {
        $route() {
            this.isnoetabs = this.$route.meta.isnoetabs;
        }
    },
    created() {
        this.isnoetabs = this.$route.meta.isnoetabs;
    },
    mounted() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        console.log(document.body.scrollTop)
    },
};
</script>

<style lang='scss'>
.layout-container {
    min-height: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .s-content {
        flex: 1;
        background: #f8f9fb;
    }
}
</style>
