<template>
    <div>
        <div class="baike">
            <div class="content">
                <div v-for="(item,index) in data" :key="index" @click="foodlistclick(item)">
                    <div>
                        <div>
                            <i class="iconfont blue" :class="changeresult(item.pictureUrl)"></i>
                        </div>
                        <div>
                            <span>{{ item.typesFood }}</span>
                        </div>
                        <div>
                            <span>共计{{ item.totalNum }}种</span>
                        </div>
                    </div>
                </div>
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
            foodTypeParams: {
                currentPage: 1,
                pageSize: 10
            },
            pic: "icondaocha"
        };
    },
    created() {},
    mounted() {
        this.getFoodTypeData();
    },
    methods: {
        blurClcik() {
            this.$router.push("/v1/c/next");
        },
        getFoodTypeData() {
            this.axios
                .post("/nutrition/food/type")
                .then(res => {
                    this.data = res.data;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //=====================================跳转食物列表====================================//
        foodlistclick(val) {
            this.$router.push({
                path: "/v1/c/next",
                query: {
                    pictureNumber: val.pictureNumber
                }
            });
        },
        changeresult(url) {
            const obj = {}
            obj[url] = true
            return obj;
        }
    }
};
</script>



<style lang="scss">
.baike {
    margin-bottom: rem(162);
    .content {
        box-shadow: 0px 5px 8px 0px rgba(72, 88, 176, 0.05);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        & > div {
            width: 30%;
            padding: rem(44) 0;
            border-bottom: 1px solid #eee;
            > div {
                border-right: 1px solid #eee;
                display: flex;
                flex-direction: column;
                align-items: center;
                > div:nth-child(2) {
                    margin: rem(29) 0 rem(10) 0;
                    font-size: rem(40);
                    font-family: SourceHanSansCN-Medium;
                    font-weight: 500;
                    color: rgba(56, 57, 69, 1);
                }
                > div:nth-child(1) {
                    font-size: rem(62);
                }
                > div:nth-child(3) {
                    font-size: rem(34);
                    font-family: SourceHanSansCN-Regular;
                    font-weight: 400;
                    color: rgba(168, 167, 170, 1);
                }
            }
            // float: left;
        }
    }
}
</style>
