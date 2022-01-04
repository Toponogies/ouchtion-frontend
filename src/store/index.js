import Vue from "vue";
import Vuex from "vuex";
import { AuthModule } from "./module/Auth/index.js";
import { BiddingModule } from "./module/Bidding/index.js";
import { CategoryModule } from "./module/Category/index.js";
import { ProductModule } from "./module/Product/index.js";
import { UserModule } from "./module/User/index.js";
import snackbar from "@/store/module/snackbar";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        ProductModule,
        CategoryModule,
        BiddingModule,
        UserModule,
        AuthModule,
        snackbar,
    },
});
