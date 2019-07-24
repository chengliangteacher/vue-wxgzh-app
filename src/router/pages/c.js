
export default [
    {
        path: "c",
        name: "c",
        meta: {
            title: "主页面",
            keepAlive: true
        },
        component: () => import("@/pages/model/c/c.vue")
    },
    {
        path: "c/next",
        name: "cNext",
        meta: {
            title: "搜索",
            isnoetabs: 1
        },
        component: () => import("@/pages/model/c/children/next.vue")
    },
    {
        path: "c/next/detail",
        name: "cndetail",
        meta: {
            title: "详情",
            isnoetabs: 1
        },
        component: () => import("@/pages/model/c/children/detail.vue")
    },
];
