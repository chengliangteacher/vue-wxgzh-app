<template>
    <div class="my-home">
        <div class="header d-flex align-center between">
            <div class="imgs">
                <img :src="userInfo.avatarUrl?`https://sac.xrdata.net/headPic/${userInfo.avatarUrl}`:'../../../../img/picure.svg'">
                <input type="file" @change="changefile">
            </div>
            <div>电话：{{ userInfo.mobile }}</div>
            <div></div>
        </div>
        <div class="my-order d-flex align-center between" @click="turnOrder">
            <div>我的订阅</div>
            <div>
                <i class="iconfont iconjiantou"></i>
            </div>
        </div>
        <div class="my-order d-flex align-center between" @click="userclick">
            <div>用户反馈</div>
            <div>
                <i class="iconfont iconjiantou"></i>
            </div>
        </div>
        <div class="login-out">
            <mt-button class="w-100" @click="loginout">退出登录</mt-button>
        </div>
    </div>
</template>

<script>
import { MessageBox, Indicator } from "mint-ui";
export default {
    components: {},
    data() {
        return {
            userInfo: {
                avatarUrl: ""
            }
        };
    },
    created() {
        if (sessionStorage.userInfo) {
            this.userInfo = JSON.parse(sessionStorage.userInfo);
        } else {
            this.isloginfac();
        }
    },
    mounted() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },
    methods: {
        //=====================================判断是否登录中====================================//
        isloginfac() {
            if (sessionStorage.userInfo) {
                return;
            } else {
                this.$router.push("/login");
            }
        },
        //=====================================跳转到订阅列表====================================//
        turnOrder() {
            this.$router.push({
                path: "/v1/f/order",
                query: {
                    userId: this.userInfo.id
                }
            });
        },
        //=====================================退出登陆====================================//
        loginout() {
            MessageBox.confirm("是否退出登录").then(action => {
                sessionStorage.clear();
                this.$router.push("/v1/a");
                MessageBox("提示", "已退出登录");
            });
        },
        //=====================================上传图片====================================//
        changefile(e) {
            Indicator.open({
                text: "上传中...",
                spinnerType: "fading-circle"
            });
            const formData = new FormData();
            const files = e.target.files;
            formData.append("file", files[0]);
            this.axios
                .post("/user/uploadFile", formData)
                .then(res => {
                    this.userInfo.avatarUrl = res.data;
                    sessionStorage.userInfo = JSON.stringify(this.userInfo);
                    Indicator.close();
                })
                .catch(err => {
                    Indicator.close();
                    console.error(err);
                });
        },
        //=====================================跳转到用户反馈====================================//
        userclick() {
            this.$router.push("/v1/f/userinfo");
        }
    }
};
</script>



<style lang="scss">
.my-home {
    > .header-page {
        width: 100%;
        height: rem(108);
        background: #26a2ff;
        font-size: rem(48);
        font-family: SourceHanSansCN-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: rem(108);
    }
    > .header {
        // width: 100%;
        // height: rem(300);
        // background: rgb(255, 255, 255);
        // box-shadow: 0px rem(5) rem(12) 0px rgba(72, 88, 176, 0.2);
        font-size: rem(40);
        font-family: SourceHanSansCN-Medium;
        font-weight: 800;
        height: rem(411);
        color: $white;
        padding: rem(30) 0 0 rem(10);
        background: #323d71 url("../../../../public/img/background.png")
            no-repeat center top;
        background-size: 100%;
        .imgs {
            position: relative;
            > img {
                position: absolute;
                width: rem(200);
                height: rem(200);
                left: 0;
                top: 0;
            }
            > input {
                width: rem(200);
                height: rem(200);
                opacity: 0;
            }
        }
    }
    > .my-order {
        margin-top: rem(30);
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
    > .login-out {
        margin-top: rem(30);
        width: 100%;
    }
}
</style>
