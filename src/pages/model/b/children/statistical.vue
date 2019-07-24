<template>
    <div v-if="statistical" class="statistical">
        <div class="header">
            <div @click="turnback">
                <i class="iconfont iconleft"></i>
            </div>
            <div>
                <span>{{ title }}</span>
            </div>
            <div @click="addorder">{{ status === 0 ? "添加订阅" : "" }}</div>
        </div>
        <div class="basic-info">
            <p>基本信息</p>
            <div v-if="typeName === 'food'">
                <div class="d-flex between">
                    <div>名称</div>
                    <div>
                        <span>{{ baseInfo.goodsName }}</span>
                    </div>
                </div>
                <div class="d-flex between">
                    <div>商标</div>
                    <div>{{ baseInfo.goodsTrademark }}</div>
                </div>
                <div class="d-flex between">
                    <div>生产企业名称</div>
                    <div>{{ baseInfo.production }}</div>
                </div>
            </div>
            <div v-else>
                <div class="d-flex between">
                    <div>名称</div>
                    <div>
                        <span>{{ baseInfo.name }}</span>
                    </div>
                </div>
                <div class="d-flex between">
                    <div>地址</div>
                    <div>
                        <span>{{ baseInfo.address }}</span>
                    </div>
                </div>
            </div>
        </div>
        <p>图形报表</p>
        <div class="swiper-chart">
            <s-swiper :options="swiperOption" class="swiper">
                <s-swiper-slide>
                    <div class="chart-bg">
                        <div id="chart1"></div>
                        <div class="bottom">-近三年抽检统计-</div>
                    </div>
                </s-swiper-slide>
                <s-swiper-slide>
                    <div class="chart-bg2">
                        <div id="chart2"></div>
                        <div class="bottom">-近半年抽检统计-</div>
                    </div>
                </s-swiper-slide>
                <div slot="pagination" class="swiper-pagination"></div> 
            </s-swiper>
        </div>
        <div class="st-food-home">
            <p>{{ typeName !== "food" ? "食品统计" : "抽检历史" }}</p>
            <st-food :params="{...baseInfo} "></st-food>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { MessageBox, Indicator } from "mint-ui";
import stFood from "./st-food";
export default {
    components: {
        "s-swiper": swiper,
        "s-swiper-slide": swiperSlide,
        "st-food": stFood
    },
    data() {
        return {
            title: "食品抽检结论",
            baseInfo: {},
            xdata: [],
            data: [],
            swiperOption: {
                autoplay: false,
                pagination: {
                    el: ".swiper-pagination"
                },
                loop: false,
                cubeEffect: {
                    shadow: false,
                    slideShadows: false
                }
            },
            option: {
                legend: {
                    orient: "vertical",
                    x: "left",
                    data: ["直接访问", "邮件营销"]
                },
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center"
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: "30",
                                    fontWeight: "bold"
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            { value: 335, name: "直接访问" },
                            { value: 310, name: "邮件营销" }
                        ]
                    }
                ]
            },
            status: 0,
            id: 0,
            typeName: "",
            statistical: true
        };
    },
    watch: {
        $route() {
            this.statistical = false;
            this.$nextTick(() => {
                this.statistical = true;
                this.init();
                this.getinit();
            });
        }
    },
    created() {
        this.init();
    },
    mounted() {
        this.getinit();
    },
    methods: {
        //=====================================初始化数据====================================//
        init() {
            this.baseInfo = { ...this.$route.query };
            this.typeName = this.$route.query.typeName;
            this.id = this.$route.query.id;
            if (this.typeName === "food") {
                this.title = "食品抽检统计";
            } else if (this.typeName === "company") {
                this.title = "受检单位抽检统计";
            } else {
                this.title = "生产企业抽检统计";
            }
            this.getorderstatus();
        },
        turnback() {
            this.$router.go(-1);
        },
        //=====================================获取订阅状态====================================//
        getorderstatus() {
            const urlobj = {
                food: "/typeuser/goodstate",
                company: "/typeuser/enterprisestate",
                production: "/typeuser/enterpriseUnitstate"
            };
            this.axios
                .get(this.geturlid(urlobj).url, {
                    params: this.geturlid(urlobj).params
                })
                .then(res => {
                    this.status = res.data.result;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //=====================================获取近3年的抽检统计====================================//
        getgoodsthree() {
            const params = {
                id: this.baseInfo.id
            };
            this.axios
                .post(`/goods/three`, params)
                .then(res => {
                    this.xdata = res.data.map(item => item.year);
                    this.data[0] = res.data.map(item => item.qualifiedCount);
                    this.data[1] = res.data.map(item => item.unQualifiedCount);
                    this.renderchart1();
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //=====================================获取近半年的抽检统计====================================//
        getgoodshalf() {
            const params = {
                id: this.baseInfo.id
            };
            this.axios
                .post("/goods/half", params)
                .then(res => {
                    this.renderchart2(res.data);
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //=====================================生产企业近3年抽检====================================//
        getproducthree() {
            const params = {
                id: this.baseInfo.id
            };
            this.axios
                .post(`/enterprise/yearCountProductionEnterprise/${params.id}`)
                .then(res => {
                    this.xdata = res.data.map(item => item.year);
                    this.data[0] = res.data.map(item => item.qualifiedCount);
                    this.data[1] = res.data.map(item => item.unQualifiedCount);
                    this.renderchart1();
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //=====================================生产企业近半年抽检====================================//
        getproducthalf() {
            const params = {
                id: this.baseInfo.id
            };
            this.axios
                .post(`/enterprise/monthCountProductionEnterprise/${params.id}`)
                .then(res => {
                    this.renderchart2(res.data);
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //=====================================受检单位近3年抽检====================================//
        getcompanythree() {
            const params = {
                id: this.baseInfo.id
            };
            this.axios
                .post(`/enterprise/countEnterprise/${params.id}`)
                .then(res => {
                    this.xdata = res.data.map(item => item.year);
                    this.data[0] = res.data.map(item => item.qualifiedCount);
                    this.data[1] = res.data.map(item => item.unQualifiedCount);
                    this.renderchart1();
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //=====================================受检单位近半年抽检====================================//
        getcompanyhalf() {
            const params = {
                id: this.baseInfo.id
            };
            this.axios
                .post(`/enterprise/monthCountEnterprise/${params.id}`)
                .then(res => {
                    this.renderchart2(res.data);
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //=====================================渲染echarts====================================//
        renderchart1() {
            const option = {
                legend: {
                    data: ["合格", "不合格"]
                },
                calculable: true,
                xAxis: [
                    {
                        type: "category",
                        data: this.xdata
                    }
                ],
                yAxis: [
                    {
                        show: false,
                        type: "value"
                    }
                ],
                series: [
                    {
                        type: "bar",
                        name: "合格",
                        data: this.data[0],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true, //开启显示
                                    position: "top" //在上方显示
                                    // textStyle: {
                                    //     //数值样式
                                    //     color: "black",
                                    //     fontSize: 12
                                    // }
                                },
                                color: "#26a2ff"
                            }
                        },
                        barWidth: 30
                    },
                    {
                        type: "bar",
                        name: "不合格",
                        barWidth: 30,
                        data: this.data[1],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true, //开启显示
                                    position: "top" //在上方显示
                                    // textStyle: {
                                    //     //数值样式
                                    //     color: "black",
                                    //     fontSize: 12
                                    // }
                                },
                                color: "rgb(194, 53, 49)"
                            }
                        }
                    }
                ]
            };
            const chart1 = this.$echarts.init(
                document.getElementById("chart1")
            );
            console.log("inininin");
            // chart1.clear();
            chart1.setOption(option, true);
        },
        renderchart2(data) {
            const option = {
                legend: {
                    orient: "vertical",
                    x: "left",
                    formatter: val => {
                        return (
                            val +
                            " " +
                            (val === "合格次数"
                                ? data.qualifiedCount
                                : data.unQualifiedCount)
                        );
                    },
                    data: ["不合格次数", "合格次数"]
                },
                series: [
                    {
                        type: "pie",
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center"
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: "15",
                                    fontWeight: "bold"
                                },
                                formatter: val => {
                                    return val.name + val.value;
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            {
                                value: data.qualifiedCount,
                                name: "合格次数",
                                itemStyle: {
                                    color: "#26a2ff"
                                }
                            },
                            {
                                value: data.unQualifiedCount,
                                name: "不合格次数",
                                itemStyle: {
                                    color: "rgb(194, 53, 49)"
                                }
                            }
                        ]
                    }
                ]
            };
            const chart2 = this.$echarts.init(
                document.getElementById("chart2")
            );
            // chart2.clear();
            chart2.setOption(option, true);
        },
        getinit() {
            if (this.typeName === "food") {
                this.getgoodsthree();
                this.getgoodshalf();
            } else if (this.typeName === "company") {
                this.getcompanythree();
                this.getcompanyhalf();
            } else {
                this.getproducthree();
                this.getproducthalf();
            }
        },
        //=====================================获取各类型参数====================================//
        geturlid(obj) {
            let url = null;
            let params = {};
            if (this.typeName === "food") {
                url = obj.food;
                params = {
                    goodsId: this.id
                };
            } else if (this.typeName === "company") {
                url = obj.company;
                params = {
                    enterpriseId: this.id
                };
            } else {
                url = obj.production;
                params = {
                    enterpriseUnitId: this.id
                };
            }
            return {
                params,
                url
            };
        },
        //=====================================添加订阅====================================//
        addorder() {
            if (!sessionStorage.userInfo) {
                MessageBox.confirm("暂未登录，点击确定后登录").then(action => {
                    this.$router.push("/login")
                }).catch(() => {
                    console.log("error")
                })
            } else {
                MessageBox.confirm("是否添加订阅?").then(action => {
                    Indicator.open({
                        text: "加载中...",
                        spinnerType: "fading-circle"
                    });
                    const urlobj = {
                        food: "/typeuser/addgoods",
                        company: "/typeuser/addunits",
                        production: "/typeuser/addenterprise"
                    };
                    this.axios
                        .post(
                            this.geturlid(urlobj).url,
                            this.geturlid(urlobj).params
                        )
                        .then(res => {
                            Indicator.close();
                            if (res.code === 2001) {
                                this.getorderstatus();
                                MessageBox("提示", "订阅成功");
                            } else {
                                MessageBox("提示", res.msg);
                            }
                        })
                        .catch(err => {
                            Indicator.close();
                            console.error(err);
                        });
                });
            }
        },
        //=====================================获取商品信息====================================//
        getGoodsData() {
            let url = "";
            if (this.typeName === "food") {
                url = `/goods/conclusion/${this.id}`;
            } else if (this.typeName === "company") {
                url = `/enterprise/goods/${this.id}`;
            } else {
                url = `/goods/commodities/${this.id}`;
            }
            this.axios
                .get(url)
                .then(res => {
                    this.baseInfo = res.data;
                    this.getinit();
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }
};
</script>



<style lang="scss">
.statistical {
    .swiper-pagination{
        bottom:0 !important;
    }
    > p {
        margin: rem(48) 0 rem(30) rem(31);
        font-size: rem(42);
        font-family: SourceHanSansCN-Bold;
        font-weight: bold;
        color: rgba(56, 57, 69, 1);
    }
    .basic-info {
        padding: rem(31);
        > p {
            margin: rem(48) 0 rem(30) 0;
            font-size: rem(42);
            font-family: SourceHanSansCN-Bold;
            font-weight: bold;
            color: rgba(56, 57, 69, 1);
        }
        > div {
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 5px 8px 0px rgba(72, 88, 176, 0.05);
            > div {
                padding: rem(31);
                font-size: rem(38);
                font-family: SourceHanSansCN-Regular;
                font-weight: 400;
                color: rgba(118, 120, 145, 1);
                border-bottom: 1px solid rgba(28, 66, 104, 0.05);
                i {
                    margin-left: rem(10);
                    // margin-top: rem(5)
                }
            }
        }
    }
    & > .swiper-chart {
        width: 100%;
        padding: 0 rem(31);
        .swiper {
            .chart-bg2 {
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px rem(5) rem(12) 0px rgba(72, 88, 176, 0.2);
                display: flex;
                justify-content: center;
                flex-direction: column;
                #chart2 {
                    width: 100%;
                    height: rem(400);
                }
                .bottom {
                    width: 100%;
                    border-top: rem(3) solid #eeeeee;
                    height: rem(80);
                    margin-top:rem(30);
                    text-align: center;
                    font-size: rem(20);
                    font-family: SourceHanSansCN-Bold;
                    font-weight: bold;
                    color: rgba(56, 57, 69, 1);
                }
            }
            .chart-bg {
                background: rgba(255, 255, 255, 1);
                box-shadow: 0px rem(5) rem(12) 0px rgba(72, 88, 176, 0.2);
                display: flex;
                justify-content: center;
                flex-direction: column;
                #chart1 {
                    width: 100%;
                    height: rem(400);
                }
                .bottom {
                    width: 100%;
                    border-top: rem(3) solid #eeeeee;
                    height: rem(80);
                    // line-height: rem(80);
                    margin-top:rem(30);
                    text-align: center;
                    font-size: rem(20);
                    font-family: SourceHanSansCN-Bold;
                    font-weight: bold;
                    color: rgba(56, 57, 69, 1);
                }
            }
        }
    }
    & > .st-food-home {
        margin-bottom: rem(320);
        height: calc(100vh - 500px);
        padding: 0 rem(31);
        > p {
            margin: rem(48) 0 rem(30) 0;
            font-size: rem(42);
            font-family: SourceHanSansCN-Bold;
            font-weight: bold;
            color: rgba(56, 57, 69, 1);
        }
    }
    & > .header {
        width: 100%;
        height: rem(108);
        padding: 0 rem(20);
        background: #4f6ef2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: rem(48);
        font-family: SourceHanSansCN-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
    }
}
</style>
