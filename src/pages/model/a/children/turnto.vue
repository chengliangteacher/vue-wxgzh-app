/*
    创建者：shuxiaokai
    创建时间：2019-06-21 16:49
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <div>
        <iframe src="https://mp.weixin.qq.com/s/amQNqAvLHoW7P4D1oopwKQ" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            url: ""
        };
    },
    created() {
        this.url = this.$route.query.url
        console.log(this.url)
    },
    methods: {

    }
};
</script>



<style lang="scss">

</style>

