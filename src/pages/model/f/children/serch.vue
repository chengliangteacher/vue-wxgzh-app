<template>
    <div class="serch-home1">
        <div class="serch">
            <p>
                <i class="iconfont iconleft" @click="turnback"></i>搜索
            </p>
            <div>
                <input v-model="conditions" :placeholder="`请输入${name}内容...`" type="text">
                <div>
                    <i class="iconfont iconlinedesign-12"></i>
                </div>
                <p @click="serch(2)">搜索</p>
            </div>
        </div>
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-immediate-check="fasle" infinite-scroll-distance="10" class="content">
            <div>
                <div v-for="(item,index) in data" :key="index" class="d-flex between align-center" @click="cliclb(item)">
                    <div>{{ item.namesAll }}</div>
                    <div>
                        <i class="iconfont iconjiantou"></i>
                    </div>
                </div>
            </div>
            <mt-spinner v-show="isspinner" color="#26a2ff" type="triple-bounce" class="text-center"></mt-spinner>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            params: {
                currentPage: 1,
                pageSize: 15
            },
            conditions: null,
            data: [],
            isspinner: false,
            flag: false,
            loading: false,
            name: ""
        };
    },
    created() {
        const type = parseInt(this.$route.query.type);
        this.name = type === 1 ? "食品" : type === 2 ? "受检单位" : "生产企业";
    },
    mounted() {},
    methods: {
        //=====================================返回====================================//
        turnback() {
            this.$router.go(-1);
        },
        //=====================================跳转内容详情====================================//
        cliclb(val) {
            if (val.typesAll === "1") {
                this.$router.push({
                    path: "/v1/b/statistical",
                    query: {
                        id: val.id,
                        goodsName: val.namesAll,
                        goodsTrademark: val.goodsTrademark
                            ? val.goodsTrademark
                            : "/",
                        production: val.enterpriseName
                            ? val.enterpriseName
                            : "",
                        typeName: "food"
                    }
                });
            } else if (val.typesAll === "2") {
                this.$router.push({
                    path: "/v1/b/statistical",
                    query: {
                        id: val.id,
                        name: val.namesAll,
                        adress: val.adress,
                        typeName: "production"
                    }
                });
            } else {
                this.$router.push({
                    path: "/v1/b/statistical",
                    query: {
                        id: val.id,
                        name: val.namesAll,
                        adress: val.adress,
                        typeName: "company"
                    }
                });
            }
        },
        //=====================================三大类型搜索====================================//
        serch(num) {
            if (num === 2) {
                this.data = [];
                this.params.currentPage = 1;
            }
            this.isspinner = true;
            const data = {
                ...this.params,
                param: {
                    conditions: this.conditions
                }
            };
            this.axios
                .post("/enterprise/comprehensive", data)
                .then(res => {
                    this.isspinner = false;
                    this.data = [...this.data, ...res.data.list];
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
        loadMore() {
            this.loading = true;
            this.params.currentPage += 1;
            this.serch(1);
        }
    }
};
</script>



<style lang="scss">
.serch-home1 {
    .serch {
        height: rem(310);
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
            > p {
                position: absolute;
                right: rem(70);
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
        height: calc(100vh - 190px);
        overflow-y: scroll;
        margin: rem(20) 0 rem(163) 0;
        > div {
            padding: 0 rem(32);
            > div {
                background: $white;
                color: $gray-600;
                font-size: rem(32);
                padding: rem(32) rem(20);
                margin-bottom: rem(30);
                box-shadow: 0px 5px 8px 0px rgba(72, 88, 176, 0.15);
            }
        }
    }
}
</style>
