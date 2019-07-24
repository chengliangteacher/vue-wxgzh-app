/*
    创建者：shuxiaokai
    创建时间：2019-06-04 16:00
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="fasle" infinite-scroll-distance="10" class="company-wrap">
        <div v-for="(item, index) in enterpriseData" :key="index" class="item-card" :class="{'banma1': (index+1)%2!==0,'banma2': (index+1)%2===0}" @click="cliclb(item)">
            <div class="item-header d-flex between px-1">
                <div>{{ item.unitName }}</div>
                <div>
                    <i class="iconfont iconmore"></i>
                </div>
            </div>
            <div class="border1px"></div>
            <div class="item-content">
                <div class="d-flex between">
                    <div>
                        <span>
                            <i class="iconfont icondingwei"></i>
                        </span>
                        <span class="gray-600">&nbsp;&nbsp;地址</span>
                    </div>
                    <div>
                        <span>{{ item.unitAddress.length>15?item.unitAddress.substring(0,15) + "...":item.unitAddress }}</span>
                    </div>
                </div>
                <div class="d-flex between">
                    <div>
                        <span>
                            <i class="iconfont iconshangpin"></i>
                        </span>
                        <span class="gray-600">&nbsp;&nbsp;不合格商品</span>
                    </div>
                    <div>
                        <span class="gray-900">{{ item.substandardGoodsName.length>15?item.substandardGoodsName.substring(0,15) + "...":item.substandardGoodsName }}</span>
                    </div>
                </div>
                <div class="d-flex between">
                    <div>
                        <span>
                            <i class="iconfont iconGroup-"></i>
                        </span>
                        <span class="gray-600">&nbsp;&nbsp;距离</span>
                    </div>
                    <div>
                        <span class="gray-900">{{ item.distance }}km</span>
                    </div>
                </div>
            </div>
        </div>
        <mt-spinner v-show="isspinner" color="#26a2ff" type="triple-bounce" class="text-center"></mt-spinner>
    </div>
</template>

<script>
export default {
    data() {
        return {
            enterPriseParams: {
                currentPage: 1,
                pageSize: 10
            },
            center: { lng: "116.37", lat: "39.92" },
            enterpriseData: [],
            loading: false,
            isspinner: false
        };
    },
    created() {
        this.getEnterPriseData();
    },
    methods: {
        //=====================================跳转内容详情====================================//
        cliclb(val) {
            this.$router.push({
                path: "/v1/b/statistical",
                query: {
                    id: val.id,
                    typeName: "company",
                    name: val.unitName,
                    address: val.unitAddress
                }
            });
        },
        //=====================================受检单位列表查询====================================//
        getEnterPriseData() {
            this.isspinner = true;
            const data = {
                currentPage: this.enterPriseParams.currentPage,
                pageSize: this.enterPriseParams.pageSize,
                param: {
                    userLongitude: sessionStorage.longitude
                        ? sessionStorage.longitude
                        : this.center.lng,
                    userLatitude: sessionStorage.latitude
                        ? sessionStorage.latitude
                        : this.center.lat
                }
            };
            this.axios
                .post("/enterprise/unit/information", data)
                .then(res => {
                    this.isspinner = false;
                    this.loading = false;
                    this.enterpriseData = [
                        ...this.enterpriseData,
                        ...res.data.list
                    ];
                    if (res.data.list.length === 0) {
                        this.loading = true;
                    } else {
                        this.loading = false;
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //=====================================下拉加载====================================//
        loadMore() {
            this.loading = true;
            this.enterPriseParams.currentPage += 1;
            this.getEnterPriseData();
        },
        //=====================================获取经纬度====================================//
        getlatitude() {
            const BMap = window.BMap;
            const geolocation = new BMap.Geolocation();
            geolocation.enableSDKLocation(); //允许SDK辅助
            geolocation.getCurrentPosition(function(r) {
                if (this.getStatus() === 0) {
                    console.log(r);
                }
            });
        }
    }
};
</script>



<style lang="scss">
.banma1 {
    box-shadow: 0px 5px 8px 0px rgba(155, 170, 255, 0.15);
}
.banma2 {
    box-shadow: 0px 5px 8px 0px rgba(255, 204, 36, 0.15);
}
.company-wrap {
    height: calc(100vh - 280px);
    overflow-y: scroll;
    .item-card {
        color: $gray-600;
        background: $white;
        margin-bottom: rem(20);
        .border1px {
            height: 1px;
            background: #ccc;
            -webkit-transform: scaleY(0.5);
            -webkit-transform-origin: 0 0;
            overflow: hidden;
            width: 95%;
            margin: 0 auto;
        }
        .item-header {
            // border-top: 1px solid $gray-200;
            // border-bottom: 1px solid $gray-200;
            padding-top: 8px;
            color: #383945;
            font-size: rem(42);
            padding-bottom: 8px;
        }
        .item-content {
            padding: 0 rem(48);
            & > div {
                padding: 3px 0;
            }
            .iconfont {
                color: #a1ace2;
            }
        }
    }
}
</style>
