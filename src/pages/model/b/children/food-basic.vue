<template>
    <div>
        <div class="conten-public">
            <div>
                <p>食品信息</p>
                <div>
                    <div class="d-flex between">
                        <div>名称</div>
                        <div class="d-flex align-center" @click="turnDetail">
                            <span>{{ baseInfo.goodsName }}</span>
                            <i class="iconfont iconjiantou"></i>
                        </div>
                    </div>
                    <div class="d-flex between">
                        <div>规格/型号</div>
                        <div>{{ baseInfo.goodsSpec }}</div>
                    </div>
                    <div class="d-flex between">
                        <div>生产日期/批号</div>
                        <div>{{ baseInfo.goodsProductTime }}</div>
                    </div>
                    <div class="d-flex between">
                        <div>商标</div>
                        <div>{{ baseInfo.goodsTrademark }}</div>
                    </div>
                    <div class="d-flex between">
                        <div>生产企业名称</div>
                        <div v-if="baseInfo.goodsManufacturerName !== '/'" @click="clickname">
                            <span>{{ baseInfo.goodsManufacturerName?(baseInfo.goodsManufacturerName.length>18?baseInfo.goodsManufacturerName.substring(0,18)+'...':baseInfo.goodsManufacturerName) : "" }}</span>
                            <i class="iconfont iconjiantou"></i>
                        </div>
                        <div v-else>
                            <span>/</span>
                        </div>
                    </div>
                    <div class="d-flex between">
                        <div>生产企业地址</div>
                        <div>{{ baseInfo.goodsManufacturerAddress.length>18?baseInfo.goodsManufacturerAddress.substring(0,18)+'...':baseInfo.goodsManufacturerAddress }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        baseInfo: {
            type: Object,
            default: function() {
                return {};
            }
        }
    },
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {
        //=====================================跳转详情====================================//
        turnDetail() {
            this.$router.push({
                path: "/v1/b/statistical",
                query: {
                    id: this.baseInfo.goodsId,
                    production: this.baseInfo.goodsManufacturerName,
                    goodsTrademark: this.baseInfo.goodsTrademark,
                    goodsName: this.baseInfo.goodsName,
                    typeName: "food"
                }
            });
        },
        //=====================================生产企业跳入抽检统计====================================//
        clickname() {
            this.$router.push({
                name: "statistical",
                query: {
                    typeName: "production",
                    name: this.baseInfo.goodsManufacturerName,
                    id: this.baseInfo.goodsManufacturerId,
                    address: this.baseInfo.goodsManufacturerAddress
                }
            });
        }
    }
};
</script>



<style lang="scss">
.conten-public {
    & > div {
        > p {
            margin: rem(48) 0 rem(30) rem(31);
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
                span {
                    color: #4f6ef2;
                }
            }
        }
    }
}
</style>
