<template>
    <div>
        <div class="baike-serch">
            <div class="serch">
                <p>
                    <i class="iconfont iconleft" @click="turnback"></i>搜索
                </p>
                <div>
                    <input v-model="foodName" placeholder="请输入搜索内容..." type="text" @input="serchdata">
                    <div>
                        <i class="iconfont iconlinedesign-12"></i>
                    </div>
                </div>
            </div>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" class="content">
                <div v-for="(item,index) in data" :key="index" class="d-flex between align-center" @click="clickDetail(item)">
                    <div>
                        <span>{{ item.foodName }}</span>
                    </div>
                    <div>
                        <i class="iconfont iconjiantou"></i>
                    </div>
                </div>
                <mt-spinner v-show="isspinner" color="#26a2ff" type="triple-bounce" class="text-center"></mt-spinner>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            data: [],
            loading: false,
            params: {
                currentPage: 0,
                pageSize: 15
            },
            foodName: "",
            isspinner: false
        };
    },
    created() {},
    mounted() {},
    methods: {
        //=====================================返回====================================//
        turnback() {
            this.$router.go(-1);
        },
        //=====================================点击跳转详情页====================================//
        clickDetail(val) {
            this.$router.push({
                path: "/v1/c/next/detail",
                query: {
                    foodId: val.foodId,
                    pictureNumber: this.$route.query.pictureNumber
                }
            });
        },
        //=====================================食物数据展示====================================//
        getFoodList() {
            this.isspinner = true;
            const data = {
                currentPage: this.params.currentPage,
                pageSize: this.params.pageSize,
                param: {
                    pictureNumber: this.$route.query.pictureNumber,
                    foodName: this.foodName
                }
            };
            this.axios
                .post("/nutrition/food/all", data)
                .then(res => {
                    this.data = [...this.data, ...res.data.list];
                    this.isspinner = false;
                    this.loading = false;
                })
                .catch(err => {
                    console.error(err);
                    this.loading = false;
                });
        },
        loadMore() {
            this.loading = true;
            this.params.currentPage += 1;
            this.getFoodList();
        },
        //=====================================搜索====================================//
        serchdata() {
            this.data.length = 0;
            this.params.currentPage = 1;
            this.params.pageSize = 15;
            const data = {
                currentPage: this.params.currentPage,
                pageSize: this.params.pageSize,
                param: {
                    pictureNumber: this.$route.query.pictureNumber,
                    foodName: this.foodName
                }
            };
            this.axios
                .post("/nutrition/food/all", data)
                .then(res => {
                    this.data = res.data.list;
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }
};
</script>



<style lang="scss">
.baike-serch {
    margin-bottom: rem(193);
    .serch {
        box-sizing: border-box;
        height: rem(300);
        box-shadow: 0px 5px 8px 0px rgba(72, 88, 176, 0.05);
        & > p {
            font-size: rem(72);
            margin: rem(55) 0 rem(55) rem(32);
            font-family: SourceHanSansCN-Bold;
            font-weight: bold;
            color: rgba(45, 47, 58, 1);
            box-sizing: border-box;
            > i {
                font-size: rem(62);
                margin-right: rem(50);
            }
        }
        > div {
            padding: 0 rem(32) 0 rem(32);
            position: relative;
            > div {
                position: absolute;
                left: rem(70);
                top: 50%;
                margin-top: rem(-22);
                color: #a0a2ad;
                font-size: rem(42);
            }
            input {
                width: 100%;
                height: rem(90);
                border-radius: rem(45);
                padding-left: rem(100);
                border: 0;
                background: rgba(243, 243, 250, 1);
            }
        }
    }
    .content {
        box-sizing: border-box;
        height: calc(100vh - 190px);
        overflow-y: scroll;
        padding: 0 rem(43);
        box-shadow: 0px 5px 8px 0px rgba(72, 88, 176, 0.05);
        & > div {
            padding: rem(43) 0;
            border-bottom: 1px solid #eee;
            i {
                color: #a0a4b7;
                font-size: rem(24);
            }
            span {
                font-size: rem(40);
                font-family: SourceHanSansCN-Medium;
                font-weight: 500;
                color: rgba(56, 57, 69, 1);
            }
        }
    }
}
</style>
