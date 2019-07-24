export default [
    {
        path: "a",
        name: "a",
        meta: {
            title: "主页面",
            keepAlive: true
        },
        component: () => import("@/pages/model/a/a.vue")
    },
    {
        path: "a/trun",
        name: "a/trun",
        meta: {
            title: "链接页",
            keepAlive: true
        },
        component: () => import("@/pages/model/a/children/turnto.vue")
    }
]
