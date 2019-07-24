/*
    创建者：shuxiaokai
    创建时间：2019-05-20 16:46
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <div class="login">
        <i class="iconfont iconguanbi" @click="closeclick"></i>
        <div class="header">
            <span>食安侠</span>
        </div>
        <div class="login-content">
            <div>
                <i class="iconfont iconshouji"></i>
                <input v-model="params.mobile" type="text" placeholder="请输入手机号">
            </div>
            <div>
                <i class="iconfont iconyanzheng"></i>
                <button :disabled="iscode" :class="{'bg-eee': iscode}" @click="getcode">获取验证码{{ times === 60 || times === 0? "" : times + "s" }}</button>
                <input v-model="params.code" type="text" placeholder="请输入验证码">
            </div>
        </div>
        <div class="login-footer">
            <button @click="login">登录</button>
        </div>
    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
    data() {
        return {
            params: {},
            iscode: false,
            times: 60
        };
    },
    created() {},
    methods: {
        //=====================================获取验证码====================================//
        getcode() {
            this.times = 60;
            this.iscode = true;
            const params = {
                mobile: this.params.mobile
            };
            this.axios
                .get("/sendsms", { params })
                .then(res => {
                    this.gettime();
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //=====================================计时====================================//
        gettime() {
            const time = setInterval(() => {
                if (this.times === 0) {
                    this.iscode = false;
                    clearInterval(time);
                } else {
                    this.times--;
                }
            }, 1000);
        },
        //=====================================登录====================================//
        login() {
            const data = {
                ...this.params
            };
            if (sessionStorage.openid) {
                data.openid = sessionStorage.openid;
            }
            this.axios
                .post("/login", data)
                .then(res => {
                    if (res.code === 2001) {
                        this.$router.push("/v1/f");
                        sessionStorage.userInfo = JSON.stringify(res.data);
                    } else {
                        MessageBox.alert(res.msg).then(action => {});
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //=====================================关闭====================================//
        closeclick() {
            this.$router.push("/v1/a");
        }
    }
};
</script>



<style lang="scss">
.login {
    > i {
        position: absolute;
        left: rem(30);
        top: rem(30);
        color: white;
        font-size: rem(50);
        font-weight: 600;
    }
    .header {
        background-color: rgb(110, 137, 255);
        height: 30vh;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: 50%;
        margin-bottom: rem(100);
        text-align: center;
        line-height: 30vh;
        color: white;
        font-size: rem(60);
        font-weight: 700;
    }
    height: 100vh;
    .login-content {
        > div {
            width: 100vw;
            padding: 0 rem(150);
            color: rgb(134, 134, 134);
            margin-bottom: rem(100);
            position: relative;
            font-size: rem(50);
            font-weight: 900;
            > input {
                width: 100%;
                border: none;
                border-bottom: 1px solid #eee;
                padding: 0 0 rem(40) rem(60);
            }
            > i {
                position: absolute;
                bottom: rem(40);
                left: rem(150);
                color: rgb(22, 123, 255);
            }
            > button {
                position: absolute;
                right: rem(150);
                bottom: rem(40);
                border: none;
                background: none;
                color: rgb(79, 79, 223);
                font-weight: 600;
            }
        }
    }
    .login-footer {
        padding: 0 rem(150);
        > button {
            width: 100%;
            border: none;
            background: rgb(110, 137, 255);
            color: white;
            height: rem(100);
            border-radius: rem(10);
        }
    }
    .bg-eee {
        color: #6e6e6e;
    }
}
</style>
