<template>
    <div class="f-order">
        <div class="item-header">
            <div @click="turnback">
                <i class="iconfont iconleft"></i>
            </div>
            <div>
                <span>我的订阅</span>
            </div>
            <div></div>
        </div>
        <div class="content">
            <div v-for="(item,index) in data" :key="index" class="item d-flex align-center between" @click="clickDetail(item)">
                <div>{{ getname(item) }}</div>
                <div>
                    <i class="iconfont iconjiantou"></i>
                </div>
            </div>
            <mt-spinner v-show="isspinner" color="#26a2ff" type="triple-bounce" class="text-center"></mt-spinner>
        </div>
        <div v-show="isshow" class="serch-parent" @click="closeshow"></div>
        <div class="or-serch">
            <div :class="{'op-none':!isshow,'anmoil-show':isshow}" @click="serch(1)">
                <div>订阅食品</div>
                <div>
                    <i class="iconfont icondaocha"></i>
                </div>
            </div>
            <div :class="{'op-none':!isshow,'anmoil-show':isshow}" @click="serch(2)">
                <div>订阅受检单位</div>
                <div>
                    <i class="iconfont icondanwei"></i>
                </div>
            </div>
            <div :class="{'op-none':!isshow,'anmoil-show':isshow}" @click="serch(3)">
                <div>订阅生产企业</div>
                <div>
                    <i class="iconfont iconshebeiguanli"></i>
                </div>
            </div>
            <div class="or-addserch">
                <div></div>
                <div @click="showbg">+</div>
            </div>
        </div>
    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
    components: {},
    data() {
        return {
            data: [],
            isspinner: false,
            isshow: false
        };
    },
    created() {
        this.getorderlist();
    },
    mounted() {},
    methods: {
        //=====================================返回上一页====================================//
        turnback() {
            this.$router.go(-1);
        },
        //=====================================查询订阅列表====================================//
        getorderlist() {
            this.isspinner = true;
            this.axios
                .get("/typeuser/getMylist")
                .then(res => {
                    this.isspinner = false;
                    this.data = res.data;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //=====================================返回名称====================================//
        getname(val) {
            let name = null;
            if (val.type === "食品") {
                name = val.goodsName;
            } else {
                name = val.enterpriseName;
            }
            return name;
        },
        //=====================================取消订阅====================================//
        cancelOrder(val) {
            this.axios
                .get(`/typeuser/del/${val}`)
                .then(res => {
                    if (res.code === 2001) {
                        MessageBox("提示", "退订成功");
                        this.getorderlist();
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //=====================================点击查看详情====================================//
        clickDetail(val) {
            MessageBox.confirm(
                `类型:${val.type}   名称:${this.getname(val)}`,
                "信息",
                { confirmButtonText: "退订" }
            )
                .then(action => {
                    this.cancelOrder(val.id);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        //=====================================展开+号====================================//
        showbg() {
            this.isshow = !this.isshow;
        },
        //=====================================关闭====================================//
        closeshow() {
            this.isshow = false;
        },
        //=====================================食品搜索跳转====================================//
        serch(val) {
            this.$router.push({
                path: "/v1/f/order/serch",
                query: {
                    type: val
                }
            });
        }
    }
};
</script>



<style lang="scss">
.f-order {
    height: 100vh;
    position: relative;
    > .item-header {
        width: 100%;
        height: rem(108);
        background: #4f6ef2;
        font-size: rem(48);
        font-family: SourceHanSansCN-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    > .content {
        margin-bottom: rem(163);
        > .item {
            margin-top: rem(10);
            width: 100%;
            height: rem(150);
            font-size: rem(38);
            font-family: SourceHanSansCN-Medium;
            font-weight: 800;
            background: rgb(255, 255, 255);
            color: rgba(73, 74, 84, 1);
            box-shadow: 0px rem(5) rem(12) 0px rgba(72, 88, 176, 0.2);
            padding: 0 rem(31);
        }
    }
    .serch-parent {
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
        transition: 0.5s;
        background: rgba(1, 1, 1, 0.5);
    }
    .or-serch {
        position: absolute;
        right: rem(30);
        bottom: rem(350);
        > div {
            margin-bottom: rem(30);
            display: flex;
            align-items: center;
            color: white;
            justify-content: flex-end;
            > div:last-child {
                margin-left: rem(30);
                width: rem(120);
                height: rem(120);
                border-radius: 50%;
                background: #4f6ef2;
                text-align: center;
                line-height: rem(120);
                > i {
                }
            }
        }
        .op-none {
            animation: down;
            opacity: 0;
        }
        // .isnone{
        //     opacity: 0;
        // }
        .anmoil-show {
            transition: 0.5s;
            animation: up;
        }
        @keyframes up {
            0% {
                opacity: 0;
            }
            50% {
                opacity: 0.5;
            }
            100% {
                opacity: 1;
            }
        }
        @keyframes down {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
            100% {
                opacity: 0;
            }
        }
    }
}
</style>
