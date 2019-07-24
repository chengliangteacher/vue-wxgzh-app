<template>
    <div>
        <div id="XSDFXPage" class="XSDFXPage"></div>
        <mt-spinner v-show="isshow" type="triple-bounce" color="#26a2ff" class="map-spin"></mt-spinner>
        <div class="map-center">
            <img src="../../../../public/img/person.svg">
        </div>
        <div class="menu-map">
            <div :class="{'bg-menu':activenum === '0'}" @click="clickmenu('0')">全部</div>
            <div :class="{'bg-menu':activenum === '1'}" @click="clickmenu('1')">1年</div>
            <div :class="{'bg-menu':activenum === '2'}" @click="clickmenu('2')">2年</div>
            <div :class="{'bg-menu':activenum === '3'}" @click="clickmenu('3')">3年</div>
            <div :class="{'bg-menu-one':acivecompany === 1}" @click="clickmenupany(1)">店</div>
            <div :class="{'bg-menu':acivecompany === 0}" @click="clickmenupany(0)">企</div>
            <div @click="clickown">我</div>
        </div>
    </div>
</template>

<script>
import BMap from "BMap";
/* eslint-disable */
// const BMap = window.BMap;
export default {
    components: {},
    data() {
        return {
            center: { lng: "116.37", lat: "39.92" },
            zoom: 15,
            isshow: false,
            activenum: "0",
            acivecompany: 0,
            map: null
        };
    },
    created() {},
    mounted() {
        this.getdiliweizhi();
    },
    methods: {
        //=====================================跳转到我的位置====================================//
        clickown() {
            this.map.panTo(
                new BMap.Point(
                    sessionStorage.longitude,
                    sessionStorage.latitude
                )
            );
            this.center.lat = sessionStorage.latitude;
            this.center.lng = sessionStorage.longitude;
            this.getmapdata(this.map);
        },
        //=====================================点击年份====================================//
        clickmenu(val) {
            this.activenum = val;
            this.getmapdata(this.map);
        },
        //=====================================点击店家====================================//
        clickmenupany(val) {
            this.acivecompany = val;
            this.getmapdata(this.map);
        },
        initmap() {
            console.log("inini");
            this.map = new BMap.Map("XSDFXPage");
            const point = new BMap.Point(
                sessionStorage.longitude
                    ? sessionStorage.longitude
                    : this.center.lng,
                sessionStorage.latitude
                    ? sessionStorage.latitude
                    : this.center.lat
            );
            this.map.addEventListener("dragend", () => {
                const center = this.map.getCenter();
                this.center.lng = center.lng;
                this.center.lat = center.lat;
                this.getmapdata(this.map);
            });
            this.getmapdata(this.map);
            this.map.centerAndZoom(point, 15);
        },
        //=====================================获取周边抽检点====================================//
        getmapdata(map) {
            this.remove();
            this.isshow = true;
            const data = {
                type: this.activenum,
                latitude: this.center.lat,
                longitude: this.center.lng,
                companyType: [this.acivecompany]
            };
            this.axios
                .post("/enterprise/map", data)
                .then(res => {
                    res.data.forEach(item => {
                        let myIcon = null;
                        if (item.type === "0") {
                            myIcon = new BMap.Icon(
                                "../../../../img/store.svg",
                                new BMap.Size(60, 60)
                            );
                        } else {
                            myIcon = new BMap.Icon(
                                "../../../../img/mark.svg",
                                new BMap.Size(60, 60)
                            );
                        }
                        const marker = new BMap.Marker(
                            new BMap.Point(item.longitude, item.latitude),
                            { icon: myIcon }
                        );
                        marker.addEventListener("click", () => {
                            this.$router.push({
                                name: "statistical",
                                query: {
                                    id: item.id,
                                    name: item.name,
                                    address: item.address,
                                    typeName:
                                        item.type === "1"
                                            ? "company"
                                            : "production"
                                }
                            });
                        });
                        map.addOverlay(marker);
                    });
                    const myIcon = new BMap.Icon(
                        "../../../../img/own.svg",
                        new BMap.Size(50, 50)
                    );
                    const marker = new BMap.Marker(
                        new BMap.Point(
                            sessionStorage.longitude,
                            sessionStorage.latitude
                        ),
                        { icon: myIcon }
                    );
                    map.addOverlay(marker);
                    this.isshow = false;
                })
                .catch(err => {
                    console.error(err);
                });
        },
        //=====================================删除标注点====================================//
        remove() {
            const overlays = this.map.getOverlays();
            for (var i = 0; i < overlays.length; i++) {
                this.map.removeOverlay(overlays[i]);
            }
        },
        //=====================================获取地理位置====================================//
        getdiliweizhi() {
            const _this = this;
            const geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(
                function(r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        sessionStorage.longitude = r.point.lng;
                        sessionStorage.latitude = r.point.lat;
                        _this.center.lat = sessionStorage.latitude;
                        _this.center.lng = sessionStorage.longitude;
                        _this.initmap(1);
                    } else {
                        alert("获取定位失败");
                        _this.initmap(2);
                    }
                },
                { enableHighAccuracy: true }
            );
        }
    }
};
</script>



<style lang="scss">
.XSDFXPage {
    width: 100vw;
    height: calc(100vh - 60px);
    margin-bottom: rem(163);
}
.map-center {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: rem(-40);
    margin-top: rem(-120);
    z-index: 1000;
    > img {
        // color: rgb(254, 151, 111);
        // color: rgb(105, 180, 82);
        width: rem(80);
        // font-size: rem(100);
    }
}
.map-spin {
    left: 50%;
    top: 50%;
    position: absolute;
    z-index: 999;
}
.menu-map {
    right: 0;
    position: absolute;
    top: rem(50);
    padding: rem(20);
    text-align: center;
    background: rgba(251, 251, 251, 0.9);
    color: rgb(104, 104, 104);
    font-size: rem(25);
    > div {
        padding: rem(30) rem(25);
        border-bottom: 1px solid #eee;
    }
    .bg-menu {
        background: #6b3081;
        border-radius: 50%;
        color: white;
        transition: 0.5s;
    }
    .bg-menu-one {
        background: rgb(60, 91, 150);
        border-radius: 50%;
        color: white;
        transition: 0.5s;
    }
    > div:nth-child(5) {
        margin-top: rem(100);
        border-top: 1px solid #eee;
    }
}
</style>
