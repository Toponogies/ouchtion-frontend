import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import SearchResult from "@/views/SearchResult";
import User from "@/views/User";

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
    {
        path: "/user",
        name: "User",
        component: User,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
