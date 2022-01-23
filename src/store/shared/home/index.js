import actions from "./actions";
import mutations from "./mutations";

const defaultState = () => ({
    productsEndingSoonLoading: false,
    productsMostBiddersLoading: false,
    productsHighestPriceLoading: false,

    productsEndingSoon: [],
    productsMostBidders: [],
    productsHighestPrice: [],
});

export const HomeModule = {
    namespaced: true,

    state: defaultState(),

    actions,

    mutations: {
        ...mutations,
        clearAll(state) {
            Object.assign(state, defaultState());
        },
    },
};
