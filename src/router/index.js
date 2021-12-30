import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import SearchResult from "@/views/SearchResult";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/search",
        name: "Search",
        component: SearchResult,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
