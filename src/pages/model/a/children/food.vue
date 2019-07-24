/*
    创建者：shuxiaokai
    创建时间：2019-06-04 16:00
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="fasle" infinite-scroll-distance="10" class="food-wrap">
        <div v-for="(item, index) in goodData" :key="index" class="item-card" :class="{'banma1': (index+1)%2!==0,'banma2': (index+1)%2===0}" @click="cliclb(item.id)">
            <div class="item-header d-flex between px-1">
                <div>{{ item.goodsName }}</div>
                <div>
                    <i class="iconfont iconmore"></i>
                </div>
            </div>
            <div class="border1px"></div>
            <div class="item-content">
                <div class="d-flex between">
                    <div>
                        <i class="iconfont iconhuanjingjiance"></i>
                        <span class="gray-600">&nbsp;&nbsp;抽检状态</span>
                    </div>
                    <div>
                        <span class="red">{{ item.result === 0 ? '不合格' : '合格' }}</span>
                    </div>
                </div>
                <div class="d-flex between">
                    <div>
                        <i class="iconfont iconwenjian"></i>
                        <span class="gray-600">&nbsp;&nbsp;规格型号</span>
                    </div>
                    <div>
                        <span class="gray-900">{{ item.goodsSpec }}</span>
                    </div>
                </div>
                <div class="d-flex between">
                    <div>
                        <i class="iconfont iconshijian"></i>
                        <span class="gray-600">&nbsp;&nbsp;公示时间</span>
                    </div>
                    <div>
                        <span class="gray-900">{{ item.createTime }}</span>
                    </div>
                </div>
                <div class="d-flex between">
                    <div>
                        <i class="iconfont iconqiye"></i>
                        <span class="gray-600">&nbsp;&nbsp;受检单位</span>
                    </div>
                    <div>
                        <span class="gray-900">{{ item.shopName }}</span>
                    </div>
                </div>
                <div class="d-flex between">
                    <div>
                        <span>
                            <i class="iconfont icondingwei"></i>
                        </span>
                        <span class="gray-600">&nbsp;&nbsp;组织抽检地</span>
                    </div>
                    <div>
                        <span class="gray-900">{{ item.publishCompanyName }}</span>
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
            goodParams: {
                pageNumber: 1,
                pageSize: 10
            },
            goodData: [],
            loading: false,
            isspinner: false
        };
    },
    created() {
        this.getgoodslist();
    },
    methods: {
        //=====================================跳转内容详情====================================//
        cliclb(val) {
            this.$router.push({
                path: "/v1/b",
                query: {
                    id: val,
                    name: "food"
                }
            });
        },
        //=====================================抽检食品列表查询====================================//
        getgoodslist() {
            this.isspinner = true;
            this.axios
                .post(`/goods/list?pageNumber=${this.goodParams.pageNumber}&pageSize=${this.goodParams.pageSize}`)
                .then(res => {
                    this.isspinner = false;
                    this.goodData = [...this.goodData, ...res.data.rows];
                    if (res.data.rows.length === 0) {
                        this.loading = true;
                    } else {
                        this.loading = false;
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        loadMore() {
            this.loading = true;
            this.goodParams.pageNumber += 1;
            this.getgoodslist();
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
.food-wrap {
    height: calc(100vh - 280px);
    overflow-y: scroll;
    .item-card {
        color: $gray-600;
        background: $white;
        margin-bottom: rem(20);
        // box-shadow: 0px 5px 8px 0px rgba(72, 88, 176, 0.15);

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
            & > div {
                font-size: rem(42);
                font-family: SourceHanSansCN-Medium;
                font-weight: 500;
                color: rgba(56, 57, 69, 1);
            }
        }
        .item-content {
            font-size: rem(36);
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
