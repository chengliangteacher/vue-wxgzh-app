
export default [
    {
        path: "b",
        name: "b",
        meta: {
            title: "主页面",
            isnoetabs: 1
        },
        component: () => import("@/pages/model/b/b.vue")
    },
    {
        path: "b/statistical",
        name: "statistical",
        meta: {
            title: "抽检统计",
            isnoetabs: 1
        },
        component: () => import("@/pages/model/b/children/statistical.vue")
    },
];
