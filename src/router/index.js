import Vue from "vue"
import Router from "vue-router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
//=====================================注册登陆页面====================================//
import login from "@/pages/login/login"
import layout from "../pages/layout/index"
//=====================================业务逻辑页面====================================//
import a from "./pages/a"
import b from "./pages/b"
import c from "./pages/c"
import d from "./pages/d"
import e from "./pages/e"
import f from "./pages/f"
import test from "@/pages/model/test/test"

Vue.use(Router)

const router = new Router({
    // mode: "history",
    routes: [
        {
            path: "/",
            redirect: "/v1/a"
        },
        {
            path: "/test",
            component: test
        },
        {
            path: "/login",
            name: "login",
            meta: {
                testInfo: {
                    desc: "登陆页面",
                    key: "login",
                    trigger: "login"
                }
            },
            component: login
        },
        {
            path: "/v1",
            component: layout,
            children: [
                ...a,
                ...b,
                ...c,
                ...d,
                ...e,
                ...f
            ]
        }
    ]
})



router.beforeEach(async(to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done() // 页面顶部的加载条
})

export default router
