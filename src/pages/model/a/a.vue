/*
    创建者：shuxiaokai
    创建时间：2019-05-20 16:47
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <div class="home">
        <div class="slider">
            <s-swiper :options="swiperOption">
                <s-swiper-slide v-for="(item,index) in advertisingData" :key="index">
                    <div class="img-wrap" @click="turnUrl(item.url)">
                        <img :src="item.pic" alt width="100%" height="100%">
                        <div>
                            <span>{{ item.title?(item.title.length>=18?item.title.substring(0,18)+"..." :item.title):"暂无" }}</span>
                        </div>
                    </div>
                </s-swiper-slide>
                <div slot="pagination" class="swiper-pagination"></div>
            </s-swiper>
        </div>
        <!-- <div class="tips d-flex">
            <div>
                <i class="iconfont icondingwei blue"></i>
            </div>
            <div>
                <div class="tips-content">
                    <s-swiper :options="swiperOption2">
                        <s-swiper-slide>网售儿童家具频现抽检不合格，目前多个平台做出回…</s-swiper-slide>
                        <s-swiper-slide>网售儿童家具频现抽检不合格，目前多个平台做出回…</s-swiper-slide>
                    </s-swiper>
                </div>
            </div>
            <div>
                <i class="iconfont iconjiantou"></i>
            </div>
        </div>-->
        <div class="hr"></div>
        <div class="tabs d-flex between center">
            <div :class="{'active': tabNames === 's-food'}" @click="tabsclick('s-food')">
                <i class="iconfont icondaocha"></i>
                <span>抽检食品</span>
            </div>
            <div :class="{'active': tabNames === 's-company'}" @click="tabsclick('s-company')">
                <i class="iconfont icondanwei"></i>
                <span>受检单位</span>
            </div>
            <div :class="{'active': tabNames === 's-production'}" @click="tabsclick('s-production')">
                <i class="iconfont iconshebeiguanli"></i>
                <span>生产企业</span>
            </div>
        </div>
        <div class="tab-content">
            <s-swiper ref="mySwiper" :options="swiperOption3">
                <s-swiper-slide data-index="s-food">
                    <s-food></s-food>
                </s-swiper-slide>
                <s-swiper-slide data-index="s-company">
                    <s-company></s-company>
                </s-swiper-slide>
                <s-swiper-slide data-index="s-production">
                    <s-production></s-production>
                </s-swiper-slide>
            </s-swiper>
        </div>
    </div>
</template>

<script>
import food from "./children/food";
import company from "./children/company";
import production from "./children/production";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import BMap from "BMap";
/* eslint-disable */
// const BMap = window.BMap;
export default {
    components: {
        "s-swiper": swiper,
        "s-swiper-slide": swiperSlide,
        "s-food": food,
        "s-company": company,
        "s-production": production
    },
    data() {
        return {
            tabNames: "s-food",
            swiperOption: {
                autoplay: true,
                pagination: {
                    el: ".swiper-pagination"
                },
                effect: "cube",
                loop: false,
                cubeEffect: {
                    shadow: false,
                    slideShadows: false
                }
            },
            swiperOption2: {
                speed: 600,
                autoplay: true,
                direction: "vertical"
            },
            swiperOption3: {
                autoplay: false,
                on: {
                    transitionEnd: swiper => {
                        const num = this.$refs.mySwiper.swiper.activeIndex;
                        if (num === 0) {
                            this.tabNames = "s-food";
                        } else if (num === 1) {
                            this.tabNames = "s-company";
                        } else {
                            this.tabNames = "s-production";
                        }
                    }
                }
            },
            activeTabs: "s-food",
            tabsSwiperInstance: null,
            isspinner: false,
            center: { lng: "116.37", lat: "39.92" },
            advertisingData: []
        };
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    mounted() {
        this.getadvertisingData();
        this.getdiliweizhi();
    },
    methods: {
        tabsclick(name) {
            this.tabNames = name;
            const num = name === "s-food" ? 0 : name === "s-company" ? 1 : 2;
            this.swiper.slideTo(num, 600, false);
        },
        //=====================================跳转外链====================================//
        turnUrl(url) {
            // this.$router.push({
            //     path: "/v1/a/trun",
            //     query: {
            //         url
            //     }
            // });
            window.location.href = url;
        },
        //=====================================首页广告链接====================================//
        getadvertisingData() {
            const data = {
                currentPage: 1,
                pageSize: 10,
                param: {}
            };
            this.axios
                .post("/newslog/advertisement/list", data)
                .then(res => {
                    this.advertisingData = res.data.list;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //=====================================获取地理位置====================================//
        getdiliweizhi() {
            const geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(
                function(r) {
                    console.log("wai",r);
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        console.log("里",r);
                        sessionStorage.longitude = r.point.lng;
                        sessionStorage.latitude = r.point.lat;
                    } else {
                        alert("获取定位失败");
                    }
                },
                { enableHighAccuracy: true }
            );
        }
    }
};
</script>



<style lang="scss">
.img-wrap {
    height: rem(520);
    position: relative;
    > div {
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(1, 1, 1, 0.3);
        color: white;
        text-align: center;
        height: rem(150);
        width: 100%;
        line-height: rem(150);
        font-size: rem(32);
    }
}
.home {
    // margin-bottom: rem(216);
    .slider {
        height: rem(520);
    }
    .tips {
        height: rem(100);
        overflow: hidden;
        padding: rem(40) rem(48) rem(25) rem(45);
        & > div:nth-child(2) {
            flex-grow: 1;
            padding: 0 rem(5);
            .tips-content {
                font-size: rem(35);
                width: 100%;
            }
        }
        & > div:last-child :nth-child(1) {
            font-size: rem(35);
        }
    }
    .tabs {
        height: rem(108);
        padding: rem(37) 0 rem(31) 0;
        & > div {
            flex-grow: 1;
            text-align: center;
            border-right: 1px solid #c6c8e3;
            font-size: rem(42);
            font-family: SourceHanSansCN-Medium;
            font-weight: 500;
            color: rgba(45, 47, 58, 1);
            & > i {
                margin-right: rem(20);
                font-size: rem(40);
            }
        }
        & > .active {
            color: rgba(93, 122, 243, 1);
        }
        & > div:last-child {
            border-right: none !important;
        }
    }
    .tab-content {
        margin-bottom: rem(163);
    }
}
</style>
