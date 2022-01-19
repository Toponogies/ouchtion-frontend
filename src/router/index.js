import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home";
import SearchResult from "@/views/SearchResult";
import ProductDetails from "@/views/ProductDetails";
import AdminDashboard from "@/views/AdminDashboard";
import BidderDashboard from "@/views/BidderDashboard";
import SellerDashboard from "@/views/SellerDashboard";
import UserProfile from "@/views/UserProfile";
import ProductCreator from "@/views/ProductCreator";

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
        path: "/p/:id",
        name: "ProductDetails",
        component: ProductDetails,
    },
    {
        path: "/dashboard/a",
        name: "AdminDashboard",
        component: AdminDashboard,
        meta: {
            preventDirectAccess: true,
        },
    },
    {
        path: "/dashboard/b",
        name: "BidderDashboard",
        component: BidderDashboard,
        meta: {
            preventDirectAccess: true,
        },
    },
    {
        path: "/dashboard/s",
        name: "SellerDashboard",
        component: SellerDashboard,
        meta: {
            preventDirectAccess: true,
        },
    },
    {
        path: "/dashboard/s/new",
        name: "ProductCreator",
        component: ProductCreator,
        meta: {
            preventDirectAccess: true,
        },
    },
    {
        path: "/profile",
        name: "UserProfile",
        component: UserProfile,
        meta: {
            preventDirectAccess: true,
        },
    },

    // redirect on invalid route
    {
        path: "*",
        redirect: "/",
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

// Global navigation guard
// https://stackoverflow.com/a/52663166
router.beforeEach((to, _, next) => {
    // Prevent direct access to these route (can only access from UI)
    // Dirty workaround (since we cannot be sure that the store is initialized before the route is navigated to.)

    if (to.meta.preventDirectAccess) {
        next({ name: "Home" });
    } else {
        next();
    }
});

export default router;
