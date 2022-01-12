import actions from "./actions";
import mutations from "./mutations";

export const HomeModule = {
    state: {
        productsEndingSoon: [],
        productsMostBidders: [],
        productsHighestPrice: [],
    },

    actions,
    mutations,
};
