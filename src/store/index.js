import Vue from "vue";
import Vuex from "vuex";
import { AuthModule } from "./auth";
import { BiddingModule } from "./bids";
import { CategoryModule } from "./categories";
import { ProductModule } from "./products";
import { UserModule } from "./users";
import { SnackbarModule } from "./ui/snackbar";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        ProductModule,
        CategoryModule,
        BiddingModule,
        UserModule,
        AuthModule,
        SnackbarModule,
    },
});
