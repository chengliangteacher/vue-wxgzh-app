<template>
    <div>
        <div class="conten-public">
            <div>
                <p>抽检信息摘要</p>
                <div>
                    <div class="d-flex between">
                        <div>公示时间</div>
                        <div>{{ baseInfo.createTime }}</div>
                    </div>
                    <div class="d-flex between">
                        <div>抽检单位</div>
                        <div>{{ baseInfo.checkCompanyName?baseInfo.checkCompanyName:"=" }}</div>
                    </div>
                    <div class="d-flex between">
                        <div>抽检地点</div>
                        <div>{{ baseInfo.address?baseInfo.address:"=" }}</div>
                    </div>
                    <div class="d-flex between">
                        <div>受检单位</div>
                        <div v-if="baseInfo.shopName !== '/'" @click="clickname">
                            <span>{{ baseInfo.shopName }}</span>
                            <i class="iconfont iconjiantou"></i>
                        </div>
                        <div v-else>
                            <span>/</span>
                        </div>
                    </div>
                    <div class="d-flex between">
                        <div>组织抽检地</div>
                        <div>{{ baseInfo.publishCompanyName }}</div>
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
        //=====================================受检单位跳入抽检统计====================================//
        clickname() {
            this.$router.push({
                path: "/v1/b/statistical",
                query: {
                    typeName: "company",
                    id: this.baseInfo.shopId,
                    name: this.baseInfo.shopName,
                    address: this.baseInfo.publishCompanyName
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
