<template>
    <div>
        <div class="c-detail">
            <div class="bg-blue">
                <div class="d-flex between align-center">
                    <i class="iconfont iconleft" @click="turnback"></i>
                    <span>食物营养库</span>
                    <div></div>
                </div>
            </div>
            <div class="detail-content1">
                <div class="d-flex center align-center">
                    <i class="iconfont" :class="dongtaiclass(allData['pictureUrl'])"></i>
                </div>
                <p>{{ allData["食物名称"] }}</p>
                <div class="info-title">
                    <div>营养元素</div>
                    <div>单位：{{ allData["用量"] }}</div>
                </div>
                <div class="d-flex around align-center">
                    <detail-cicle v-for="(item,index) in data" :key="index" :data="item"></detail-cicle>
                </div>
                <div class="more-element" @click="moreclick">更多营养元素</div>
                <div class="ps-title">注：以上为三大营养元素的功能比</div>
            </div>
            <div v-show="ismore" class="detil-footer">
                <div>
                    <div v-for="(item,index) in footerData" :key="index" class="d-flex align-center between">
                        <span>{{ item.name }}</span>
                        <span>{{ item.weight }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import detailCicle from "./detail-cicle";
export default {
    components: {
        "detail-cicle": detailCicle
    },
    data() {
        return {
            data: [],
            footerData: [],
            allData: {},
            ismore: false
        };
    },
    created() {
        this.getfoodDetail();
    },
    mounted() {},
    methods: {
        turnback() {
            this.$router.go(-1);
        },
        //=====================================获取营养信息====================================//
        getfoodDetail() {
            const params = {
                foodId: this.$route.query.foodId
            };
            this.axios
                .get("/nutrition/food/detail", { params })
                .then(res => {
                    this.allData = res.data[0];
                    this.data[0] = {
                        name: "蛋白质",
                        weight: this.allData["蛋白质"],
                        rate:
                            this.twofloatnum(this.allData["蛋白质比例"]) * 100,
                        color: "#F4B548"
                    };
                    this.data[1] = {
                        name: "脂肪",
                        weight: this.allData["脂肪"],
                        rate: this.twofloatnum(this.allData["脂肪比例"]) * 100,
                        color: "#F35E81"
                    };
                    this.data[2] = {
                        name: "碳水化合物",
                        weight: this.allData["碳水化合物"],
                        rate:
                            this.twofloatnum(this.allData["碳水化合物比例"]) *
                            100,
                        color: "#40CFB2"
                    };
                    for (const key in this.allData) {
                        if (
                            key !== "蛋白质" &&
                            key !== "脂肪" &&
                            key !== "碳水化合物比例" &&
                            key !== "蛋白质比例" &&
                            key !== "脂肪比例" &&
                            key !== "碳水化合物" &&
                            key !== "foodId" &&
                            key !== "食物名称" &&
                            key !== "pictureUrl" &&
                            key !== "用量" &&
                            key !== "能量"
                        ) {
                            this.footerData.push({
                                name: key,
                                weight: this.allData[key]
                            });
                        }
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //=====================================点击更多====================================//
        moreclick() {
            this.ismore = !this.ismore;
        },
        //=====================================js保留两位小数====================================//
        twofloatnum(num) {
            // const changenum = parseFloat(num);
            let changenum = null;
            if (num.split(".")[1] && num.split(".")[1].length >= 2) {
                changenum =
                    num.split(".")[0] + "." + num.split(".")[1].substring(0, 2);
            } else {
                changenum = num;
            }
            console.log(changenum);
            return parseFloat(changenum);
        },
        //=====================================动态图标====================================//
        dongtaiclass(url) {
            const obj = {};
            obj[url] = true;
            return obj;
        }
    }
};
</script>



<style lang="scss">
.c-detail {
    padding: 0 rem(48);
    .detail-content1 {
        margin-top: rem(231);
        padding: rem(38);
        width: 100%;
        height: rem(957);
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px rem(5) rem(12) 0px rgba(72, 88, 176, 0.2);
        border-radius: rem(16);
        position: relative;
        > div:first-child {
            width: rem(190);
            height: rem(190);
            border: rem(12) solid white;
            background: #526af4;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            margin-left: rem(-92);
            top: rem(-80);
            > i {
                font-size: rem(69);
                color: white;
            }
        }
        > .info-title {
            margin: rem(59) 0 rem(42) 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            > div:first-child {
                font-size: rem(42);
                font-family: SourceHanSansCN-Medium;
                font-weight: 500;
                color: rgba(56, 57, 69, 1);
            }
            > div:last-child {
                font-size: rem(38);
                font-family: SourceHanSansCN-Regular;
                font-weight: 400;
                color: rgba(165, 168, 200, 1);
            }
        }
        > p {
            font-size: rem(30);
            font-family: SourceHanSansCN-Medium;
            font-weight: 800;
            color: rgba(73, 74, 84, 1);
            text-align: center;
            margin-top: rem(100);
        }
        > .more-element {
            width: rem(320);
            height: rem(66);
            border: rem(2) solid rgba(94, 124, 243, 1);
            opacity: 0.7;
            border-radius: rem(33);
            text-align: center;
            line-height: rem(60);
            font-size: rem(34);
            font-family: SourceHanSansCN-Medium;
            font-weight: 500;
            color: rgba(94, 124, 243, 1);
            margin: rem(80) auto rem(10) auto;
        }
        .ps-title {
            font-size: rem(20);
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            text-align: center;
            color: rgba(178, 178, 198, 1);
        }
    }
    .bg-blue {
        background: #465af2;
        width: 100%;
        height: rem(564);
        position: absolute;
        top: 0;
        left: 0;
        > div {
            font-size: rem(48);
            font-family: SourceHanSansCN-Medium;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            margin: rem(32);
        }
    }
    .detil-footer {
        margin-top: rem(10);
        margin-bottom: rem(163);
        width: 100%;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 5px 8px 0px rgba(72, 88, 176, 0.05);
        border-radius: 16px;
        > div {
            padding: 0 rem(35);
            > div {
                padding: rem(35) 0;
                border-bottom: 1px solid rgb(230, 230, 230);
                > span:first-child {
                    color: #383945;
                    font-size: rem(40);
                }
                > span:last-child {
                    color: #9497b3;
                    font-size: rem(40);
                }
            }
        }
    }
}
</style>
