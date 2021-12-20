import Vue from "vue";
import Vuex from "vuex";
import { AuthModule } from "./module/Auth/index.js";
import { BiddingModule } from "./module/Bidding/index.js";
import { CategoryModule } from "./module/Category/index.js.js.js.js";
import { ProductModule } from "./module/Product/index.js";
import { UserModule } from "./module/User/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
        ProductModule,   //product
        CategoryModule,  //category
        BiddingModule,   //bidding 
        UserModule,      //user
        AuthModule,      //authenticate
    }
});
