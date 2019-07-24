export default [
    {
        path: "f",
        name: "f",
        meta: {
            isnoetabs: 1,
            title: "主页面"
        },
        component: () => import("@/pages/model/f/f.vue")
    },
    {
        path: "f/order",
        name: "order",
        meta: {
            isnoetabs: 1,
            title: "order"
        },
        component: () => import("@/pages/model/f/my-order.vue")
    },
    {
        path: "f/order/serch",
        name: "order/serch",
        meta: {
            isnoetabs: 1,
            title: "order/serch"
        },
        component: () => import("@/pages/model/f/children/serch.vue")
    },
    {
        path: "f/userinfo",
        name: "userinfo",
        meta: {
            isnoetabs: 1,
            title: "userinfo"
        },
        component: () => import("@/pages/model/f/userinfo")
    }
]
