<template>
    <div>
        <div class="tabs-bottom">
            <div class="d-flex around">
                <div :class="{'active':tabsName === 1}" @click="tabsclick(1)">
                    <i class="iconfont iconshouye"></i>
                    <span>首页</span>
                </div>
                <div :class="{'active':tabsName === 2}" @click="tabsclick(2)">
                    <i class="iconfont icondingwei1"></i>
                    <span>地图</span>
                </div>
                <div :class="{'active':tabsName === 3}" @click="tabsclick(3)">
                    <div>
                        <i class="iconfont iconlinedesign-12 tabs-serch"></i>
                    </div>
                    <span>搜索</span>
                </div>
                <div :class="{'active':tabsName === 4}" @click="tabsclick(4)">
                    <i class="iconfont iconshu"></i>
                    <span>百科</span>
                </div>
                <div :class="{'active':tabsName === 5}" @click="tabsclick(5)">
                    <i class="iconfont iconset"></i>
                    <span>我的</span>
                </div>
            </div>
        </div>
        <!-- <div class="banyuan"></div> -->
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            tabsName: 1
        };
    },
    watch: {
        $route() {
            this.activetabname();
        }
    },
    created() {
        this.activetabname();
    },
    mounted() {},
    methods: {
        tabsclick(val) {
            this.tabsName = val;
            if (this.tabsName === 1) {
                this.$router.push("/v1/a");
            } else if (this.tabsName === 2) {
                this.$router.push("/v1/e");
            } else if (this.tabsName === 3) {
                this.$router.push("/v1/d");
            } else if (this.tabsName === 4) {
                this.$router.push("/v1/c");
            } else {
                this.$router.push("/v1/f");
            }
        },
        //=====================================判断图标唤醒状态====================================//
        activetabname() {
            if (this.$route.fullPath === "/v1/a") {
                this.tabsName = 1
            } else if (this.$route.fullPath === "/v1/e") {
                this.tabsName = 2
            } else if (this.$route.fullPath === "/v1/d") {
                this.tabsName = 3;
            } else if (this.$route.fullPath === "/v1/c") {
                this.tabsName = 4;
            } else if (this.$route.fullPath === "/v1/f") {
                this.tabsName = 5;
            }
        }
    }
};
</script>



<style lang="scss">
.tabs-bottom {
    width: 100%;
    z-index: 5;
    position: fixed;
    bottom: 0;
    left: 0;
    & > div:first-child {
        width: 100%;
        height: rem(162);
        background: white;
        position: absolute;
        bottom: 0;
        left: 0;
        & > div {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #a7acc0;
            flex-grow: 1;
            font-size: rem(40);
            transition: 0.5s;
        }
        .active {
            color: #5e7cf3 !important;
        }
        & > div:nth-child(3) {
            & > div {
                width: rem(120);
                height: rem(120);
                border-radius: rem(80);
                background: linear-gradient(
                    0deg,
                    rgba(82, 90, 246, 1),
                    rgba(107, 178, 244, 1)
                );
                box-shadow: 0px 8px 12px 0px rgba(79, 87, 246, 0.4);
                margin-top: rem(-60);
                display: flex;
                align-items: center;
                justify-content: center;
                & > i {
                    font-size: rem(80);
                    color: #ffffff;
                }
            }
        }
    }
}
.banyuan {
    width: rem(120);
    height: rem(120);
    background: black;
    z-index: 6;
}
</style>
