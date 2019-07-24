<template>
    <div>
        <mt-popup v-model="isprotitle" popup-transition="popup-fade">
            <div class="popup-card">
                <h3>{{ datainfo.name }}</h3>
                <p>{{ datainfo.description }}</p>
                <div class="d-flex end primary">
                    <span @click="isprotitle = false">我知道了</span>
                </div>
            </div>
        </mt-popup>
        <div class="detail-header">
            <div @click="turnback">
                <i class="iconfont iconleft"></i>
            </div>
            <div>
                <span>食品抽检结论</span>
            </div>
            <div></div>
        </div>
        <div class="detail-content">
            <div>
                <div :class="{'active': tabNames == 1}" @click="basicClick(1)">基本信息</div>
                <div :class="{'active': tabNames == 2}" @click="basicClick(2)">不合格指标</div>
            </div>
            <s-swiper ref="mySwiper" :options="swiperOption">
                <s-swiper-slide>
                    <div class="detail-left">
                        <food-basic :base-info="baseInfo"></food-basic>
                        <public-info :base-info="baseInfo"></public-info>
                    </div>
                </s-swiper-slide>
                <s-swiper-slide>
                    <div v-for="(item,index) in baseInfo.unQualifiedList" :key="index" class="conten-unQualified">
                        <div class="d-flex between">
                            <div>指标名称</div>
                            <div @click="handledetail(item.name)">
                                <span class="b-blue">{{ item.name }}</span>
                            </div>
                        </div>
                        <div class="d-flex between">
                            <div>指标值</div>
                            <div>{{ item.standardValue }}</div>
                        </div>
                        <div class="d-flex between ">
                            <div>检验值</div>
                            <div class="red">{{ item.checkValue }}</div>
                        </div>
                    </div>
                    <mt-spinner v-show="isshow" type="triple-bounce" color="#26a2ff" class="map-spin text-center"></mt-spinner>
                </s-swiper-slide>
            </s-swiper>
        </div>
    </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import foodBasic from "./children/food-basic";
import publicInfo from "./children/public";
export default {
    components: {
        "s-swiper": swiper,
        "s-swiper-slide": swiperSlide,
        "food-basic": foodBasic,
        "public-info": publicInfo
    },
    data() {
        return {
            tabNames: 1,
            swiperOption: {
                direction: "horizontal",
                autoplay: false,
                on: {
                    transitionEnd: swiper => {
                        const num = this.$refs.mySwiper.swiper.activeIndex;
                        this.tabNames = num === 0 ? 1 : 2;
                    }
                }
            },
            baseInfo: {
                goodsManufacturerAddress: ""
            },
            name: "",
            isshow: false,
            isprotitle: false,
            datainfo: {}
        };
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    created() {},
    mounted() {
        this.name = this.$route.query.name;
        this.getGoodsone();
    },
    methods: {
        //=====================================返回上一页====================================//
        turnback() {
            this.$router.go(-1);
        },
        //=====================================切换tabs====================================//
        basicClick(val) {
            this.tabNames = val;
            const num = val === 1 ? 0 : 1;
            this.swiper.slideTo(num, 600, false);
        },
        //=====================================获取抽检明细====================================//
        getGoodsone() {
            this.axios
                .get(`/goods/conclusion/${this.$route.query.id}`)
                .then(res => {
                    this.baseInfo = { ...res.data, id: this.$route.query.id };
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //=====================================跳转详情====================================//
        turnDetail() {
            this.$router.push({
                name: "statistical",
                query: {
                    id: this.$route.query.id,
                    typeName: "food"
                }
            });
        },
        //=====================================点击弹出详情====================================//
        handledetail(val) {
            this.isshow = true;
            const data = {
                pageSize: 2,
                pageNum: 1,
                keywords: val
            };
            const formData = new FormData()
            for (const key in data) {
                formData.append(key, data[key]);
            }
            this.axios.post(`/foodencyclopedia/list`, formData).then(res => {
                if (res.data.rows.length !== 0) {
                    this.datainfo = res.data.rows[0];
                } else {
                    this.datainfo = {
                        name: val,
                        description: "暂无介绍"
                    }
                }
                this.isprotitle = true;
                this.isshow = false
            }).catch(err => {
                console.log(err)
                this.isshow = false
            });
        }
    }
};
</script>



<style lang="scss">
.b-blue{
    color: #4f6ef2;
}
.popup-card{
    width: 80vw;
    background: white;
    border-radius: 5px;
    padding: rem(30);
    color: rgba(118, 120, 145, 1);
    box-shadow: 0px 4px 8px 0px rgba(214, 214, 231, 0.4);
    h3{
        color: #4f6ef2;
    }
    p{
        font-size: rem(38);
        line-height: rem(70);
    }
    div{
        color: #4f6ef2;
    }
}
.detail-header {
    padding: 0 rem(20);
    width: 100%;
    height: rem(108);
    background: #4f6ef2;
    font-size: rem(48);
    font-family: SourceHanSansCN-Medium;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(255, 255, 255, 1);
}
.detail-content {
    .swiper-wrapper{
        // display: flex !important;
    }
    margin-bottom: rem(163);
    & > div:first-child {
        width: 100%;
        height: rem(108);
        background: $white;
        box-shadow: 0px 4px 8px 0px rgba(214, 214, 231, 0.4);
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        & > .active {
            color: #4f6ef2;
        }
        > div {
            flex-grow: 1;
        }
        & > div:first-child {
            border-right: 1px solid rgba(170, 176, 201, 0.5);
        }
    }
    .conten-unQualified {
        margin-top: rem(18);
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 5px 8px 0px rgba(72, 88, 176, 0.05);
        > div {
            padding: rem(31);
            font-size: rem(38);
            font-family: SourceHanSansCN-Regular;
            font-weight: 400;
            color: rgba(118, 120, 145, 1);
            border-bottom: 1px solid rgba(28, 66, 104, 0.05);
        }
    }
}
</style>
