import actions from "./actions";
import mutations from "./mutations";

export const HomeModule = {
    namespaced: true,

    state: {
        productsEndingSoonLoading: false,
        productsMostBiddersLoading: false,
        productsHighestPriceLoading: false,

        productsEndingSoon: [],
        productsMostBidders: [],
        productsHighestPrice: [],
    },

    actions,
    mutations,
};
