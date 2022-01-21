import Vue from "vue";
import Vuex from "vuex";

import { HomeModule } from "./home";
import { SearchModule } from "./search";
import { CategoryModule } from "./categories";
import { SnackbarModule } from "./ui/snackbar";

import { AuthModule } from "./auth";
import { CurrentUserModule } from "./currentUser";
import { CurrentProductModule } from "./currentProduct";

import { BiddingModule } from "./bids";
import { ProductModule } from "./products";
import { WatchlistModule } from "./watchlist";

import { ProductsAdminModule } from "./productsAdmin";
import { UsersModule } from "./users";
import { AddProductModule } from "./addProduct/index";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        HomeModule,
        SearchModule,
        CategoryModule,
        SnackbarModule,

        AuthModule,
        CurrentUserModule,
        CurrentProductModule,

        BiddingModule,
        ProductModule,
        WatchlistModule,

        ProductsAdminModule,
        UsersModule,
        AddProductModule
    },
});
