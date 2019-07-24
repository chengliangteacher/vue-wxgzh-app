<template>
    <div class="circle-parent d-flex flex-column center">
        <div class="circle-prograss d-flex center align-center" :style="{borderColor:data.color}">
            <div>
                <span>{{ twofloatnum(data.rate.toString()) }}</span>%
            </div>
            <div class="left">
                <div :style="{transform: `rotate(${-(data.rate > 50 ? ((data.rate - 50)/100)*180*2 : 0)}deg)`}"></div>
            </div>
            <div class="right">
                <div :style="{transform: `rotate(${-(data.rate > 50 ? 180 : data.rate/100*180*2)}deg)`}"></div>
            </div>
        </div>
        <div>
            <span>{{ data.weight }}</span>
        </div>
        <div>
            <span>{{ data.name }}</span>
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
    methods: {
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
        }
    }
};
</script>



<style lang="scss">
.circle-parent {
    .circle-prograss {
        width: rem(216);
        height: rem(216);
        border-radius: 50%;
        border: rem(14) solid rgba(226, 226, 233, 1);
        // overflow: hidden;
        position: relative;
        .left {
            width: rem(108);
            height: rem(216);
            border-top-left-radius: rem(108);
            border-bottom-left-radius: rem(108);
            overflow: hidden;
            position: absolute;
            left: rem(-14);
            top: rem(-14);
            > div {
                border-top-left-radius: rem(108);
                border-bottom-left-radius: rem(108);
                left: rem(0);
                width: rem(108);
                height: rem(216);
                transform: rotate(80deg);
                transform-origin: right;
                border: rem(15) solid rgba(226, 226, 233, 1);
                border-right: none;
                position: absolute;
                z-index: 10;
                top: rem(0);
            }
        }
        .right {
            width: rem(108);
            height: rem(216);
            border-top-right-radius: rem(108);
            border-bottom-right-radius: rem(108);
            overflow: hidden;
            position: absolute;
            right: rem(-14);
            top: rem(-14);
            > div {
                border-top-right-radius: rem(108);
                border-bottom-right-radius: rem(108);
                border: rem(14) solid rgba(226, 226, 233, 1);
                transform-origin: left;
                border-left: none;
                right: rem(-0);
                width: rem(108);
                height: rem(216);
                position: absolute;
                z-index: 10;
                top: rem(-0);
            }
        }
        & > div:first-child {
            color: #9497b3;
            > span {
                font-size: rem(53);
                font-family: SourceHanSansCN-Bold;
                font-weight: bold;
                color: rgba(82, 83, 96, 1);
            }
        }
    }
    > div:nth-child(2) {
        font-size: rem(48);
        margin: rem(40) 0 rem(5) 0;
        font-family: SourceHanSansCN-Bold;
        font-weight: bold;
        color: rgba(61, 62, 74, 1);
    }
    > div:nth-child(3) {
        font-size: rem(34);
        font-family: SourceHanSansCN-Regular;
        font-weight: bold;
        color: rgba(148, 151, 179, 1);
    }
}
</style>
