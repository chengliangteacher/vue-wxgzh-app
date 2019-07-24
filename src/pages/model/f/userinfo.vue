<template>
    <div class="f-userinfo">
        <div class="item-header">
            <div @click="turnback">
                <i class="iconfont iconleft"></i>
            </div>
            <div>
                <span>用户反馈</span>
            </div>
            <div></div>
        </div>
        <div class="content">
            <textarea v-model="textrea" cols="30" rows="10"></textarea>
            <button @click="commit">提交</button>
        </div>
    </div>
</template>

<script>
import { Indicator, MessageBox } from "mint-ui";
export default {
    components: {},
    data() {
        return {
            textrea: ""
        };
    },
    created() {},
    mounted() {},
    methods: {
        //=====================================返回上一页====================================//
        turnback() {
            this.$router.go(-1);
        },
        //=====================================i提交====================================//
        commit() {
            Indicator.open({
                text: "加载中...",
                spinnerType: "fading-circle"
            });
            const data = {
                content: this.textrea
            };
            this.axios
                .post("/feedback/add", data)
                .then(res => {
                    Indicator.close();
                    this.$router.push("/v1/f");
                    MessageBox("提示", "提交成功");
                })
                .catch(err => {
                    Indicator.close();
                    console.error(err);
                });
        }
    }
};
</script>



<style lang="scss">
.f-userinfo {
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
        padding: rem(60) rem(30);
        textarea {
            width: 100%;
            border-radius: rem(10);
        }
        > button {
            width: 100%;
            border: none;
            height: rem(100);
            color: white;
            background: #4f6ef2;
            margin-top: rem(30);
        }
    }
}
</style>
