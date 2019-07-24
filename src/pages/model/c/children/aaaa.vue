<template>
    <div>
        <div class="huanbi d-flex center align-center">
            <div>
                <span>{{ data.rate }}</span>%
            </div>
            <div class="topbiao"></div>
            <div :style="{borderColor:data.color,clip:`rect(auto, auto, auto, ${(216/3)*(1-(data.rate/100))}px)`}" class="prograss"></div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        data: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    data() {
        return {};
    },
    watch: {
        data() {}
    },
    created() {},
    mounted() {},
    methods: {}
};
</script>



<style lang="scss">
.huanbi {
    width: rem(216);
    height: rem(216);
    border: rem(14) solid rgba(226, 226, 233, 1);
    border-radius: 50%;
    position: relative;
    margin: 0;
    & > .topbiao {
        width: rem(10);
        height: rem(37);
        background: rgba(251, 252, 253, 1);
        box-shadow: 0px 0px rem(6) 0px rgba(160, 168, 193, 0.6);
        border-radius: rem(3);
        position: absolute;
        top: rem(-18);
        left: 50%;
        margin-left: rem(-5);
        z-index: 2;
    }
    & > .prograss {
        width: rem(216);
        height: rem(216);
        border: rem(14) solid rgb(0, 0, 255);
        border-radius: 50%;
        position: absolute;
        left: rem(-10);
        top: rem(-18);
        z-index: 1;
        transition: 0.8s;
        overflow: hidden;
    }
    & > div:first-child {
        color: #9497b3;
        span {
            font-size: rem(53);
            font-family: SourceHanSansCN-Bold;
            font-weight: bold;
            color: rgba(82, 83, 96, 1);
        }
    }
}
</style>
