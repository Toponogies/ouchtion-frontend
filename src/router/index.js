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
import VerifyAccount from "@/views/VerifyAccount";
import ResetPass from "@/views/ResetPass";
import UpdateEmail from "@/views/UpdateEmail";

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
    },
    {
        path: "/dashboard/b",
        name: "BidderDashboard",
        component: BidderDashboard,
    },
    {
        path: "/dashboard/s",
        name: "SellerDashboard",
        component: SellerDashboard,
    },
    {
        path: "/dashboard/s/new",
        name: "ProductCreator",
        component: ProductCreator,
    },
    {
        path: "/profile",
        name: "UserProfile",
        component: UserProfile,
    },
    {
        path: "/verify",
        name: "VerifyAccount",
        component: VerifyAccount,
    },
    {
        path: "/reset",
        name: "ResetPassAccount",
        component: ResetPass,
    },
    {
        path: "/updateEmail",
        name: "UpdateEmail",
        component: UpdateEmail,
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

export default router;
