<template>
    <div v-infinite-scroll="loadMore" :autoFill="false" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="fasle" infinite-scroll-distance="10" class="st-food-host">
        <div v-show="params.typeName !== 'food'" class="st-food">
            <div v-for="(item,index) in data" :key="index" class="d-flex align-center between" @click="cliclb1(item)">
                <div>
                    <span>名称：{{ item.name }}</span>
                </div>
                <div class="d-flex align-center">
                    <span>{{ item.totalCount }}</span>
                    <i class="iconfont iconjiantou"></i>
                </div>
            </div>
        </div>
        <div v-show="params.typeName === 'food'" class="st-food1">
            <div v-for="(item, index) in data" :key="index" class="item-card">
                <div class="item-header d-flex between px-1">
                    <div>{{ item.goodsName }}</div>
                    <div>
                        <i class="iconfont iconmore"></i>
                    </div>
                </div>
                <div class="border1px"></div>
                <div class="item-content" @click="cliclb(item.id)">
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
        </div>
        <mt-spinner v-show="isspinner" color="#26a2ff" type="triple-bounce" class="text-center"></mt-spinner>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        params: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    data() {
        return {
            data: [],
            pageNumber: 1,
            pageSize: 10,
            loading: false,
            isspinner: false
        };
    },
    created() {
        this.getproductfooddata();
    },
    methods: {
        cliclb1(val) {
            this.$router.push({
                path: "/v1/b/statistical",
                query: {
                    id: val.id,
                    typeName: "food",
                    goodsName: val.name,
                    goodsTrademark: "/",
                    production:
                        this.params.typeName === "company"
                            ? val.manufacturerName
                            : this.params.name
                }
            });
        },
        //=====================================生产企业食品列表====================================//
        getproductfooddata() {
            this.isspinner = true;
            let url = "/goods/commodities";
            if (this.params.typeName === "food") {
                url = "/goods/inspection";
            } else if (this.params.typeName === "company") {
                url = "/enterprise/goods";
            }
            const params = {
                id: this.params.id,
                pageNumber: this.pageNumber,
                pageSize: this.pageSize,
                categoryId: ""
            };
            this.axios
                .get(url, { params })
                .then(res => {
                    this.data = [...this.data, ...res.data.rows];
                    this.isspinner = false;
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
        //=====================================加载更多====================================//
        loadMore() {
            this.loading = true;
            this.pageNumber += 1;
            this.getproductfooddata();
        },
        //=====================================添加订阅====================================//
        addOrder() {}
    }
};
</script>



<style lang="scss">
.st-food-host {
    margin-bottom: rem(220);
    height: rem(1000);
    overflow-y: scroll;
    .st-food {
        margin-top: rem(30);
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 5px 8px 0px rgba(72, 88, 176, 0.05);
        width: 100%;
        padding: 0 rem(31);
        > div {
            padding: rem(31) 0;
            font-size: rem(32);
            font-family: SourceHanSansCN-Regular;
            border-bottom: 1px solid #eee;
            font-weight: 400;
            color: rgba(118, 120, 145, 1);
        }
    }
    .st-food1 {
        margin-top: rem(30);
        .item-card {
            color: $gray-600;
            background: $white;
            margin-bottom: rem(20);
            box-shadow: 0px 5px 8px 0px rgba(72, 88, 176, 0.15);
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
}
</style>
