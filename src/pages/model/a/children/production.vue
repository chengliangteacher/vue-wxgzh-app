/*
    创建者：shuxiaokai
    创建时间：2019-06-04 16:00
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="fasle" infinite-scroll-distance="10" class="product-wrap">
        <div v-for="(item, index) in productData" :key="index" class="item-card" :class="{'banma1': (index+1)%2!==0,'banma2': (index+1)%2===0}" @click="cliclb(item)">
            <div class="item-header d-flex between px-1">
                <div>{{ item.enterpriseName }}</div>
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
                        <span>{{ item.enterpriseAddress.length>15?item.enterpriseAddress.substring(0,15) + "...":item.enterpriseAddress }}</span>
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
            productData: [],
            loading: false,
            isspinner: false,
            center: { lng: "116.37", lat: "39.92" },

        };
    },
    created() {
        this.getproductDataData();
    },
    methods: {
        //=====================================下拉加载====================================//
        loadMore() {
            this.loading = true;
            this.enterPriseParams.currentPage += 1;
            this.getproductDataData();
        },
        //=====================================跳转内容详情====================================//
        cliclb(val) {
            this.$router.push({
                name: "statistical",
                query: {
                    id: val.id,
                    typeName: "production",
                    name: val.enterpriseName,
                    address: val.enterpriseAddress
                }
            });
        },
        //=====================================受检单位列表查询====================================//
        getproductDataData() {
            this.isspinner = true;
            const data = {
                currentPage: this.enterPriseParams.currentPage,
                pageSize: this.enterPriseParams.pageSize,
                param: {
                    userLongitude: sessionStorage.longitude ? sessionStorage.longitude : this.center.lng,
                    userLatitude: sessionStorage.latitude ? sessionStorage.latitude : this.center.lat
                }
            };
            this.axios
                .post("/enterprise/production/information", data)
                .then(res => {
                    this.isspinner = false;
                    this.productData = [...this.productData, ...res.data.list];
                    if (res.data.list.length === 0) {
                        this.loading = true;
                    } else {
                        this.loading = false;
                    }
                })
                .catch(err => {
                    console.error(err);
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
.product-wrap {
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
