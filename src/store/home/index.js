import actions from "./actions";
import mutations from "./mutations";

export const HomeModule = {
    namespaced: true,

    state: {
        productsEndingSoon: [],
        productsMostBidders: [],
        productsHighestPrice: [],
    },

    actions,
    mutations,
};
