/*
    创建者：shuxiaokai
    创建时间：2019-07-03 11:25
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <div>
        <s-swiper ref="mySwiper" :options="swiperOption">
            <s-swiper-slide>
                <div class="vh-30">aaa</div>
            </s-swiper-slide>
            <s-swiper-slide>
                <div class="vh-30">bbb</div>
            </s-swiper-slide>
        </s-swiper>
    </div>
</template>

<script>
/*eslint-disable*/ 
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
    components: {
        "s-swiper": swiper,
        "s-swiper-slide": swiperSlide,
    },
    data() {
        return {
            swiperOption: {
                direction: "horizontal",
            }
        };
    },
    created() {},
    methods: {}
};
</script>



<style lang="scss">
</style>
