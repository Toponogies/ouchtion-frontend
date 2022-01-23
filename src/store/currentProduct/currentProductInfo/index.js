import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const defaultState = () => ({
    id: null,
    isLoading: false,

    // product basic info
    title: null,
    seller: {
        id: null,
        username: null,
        rating: 0.0,
    },
    startTime: null,
    endTime: null,
    categoryId: null,
    categories: [],
    isSold: false,

    // bid & buy now
    bid: {
        highestPrice: null,
        highestUser: {
            id: null,
            username: null,
            rating: 0.0,
        },
        priceIncrement: null,
    },
    buyNow: {
        price: null,
    },

    // related products
    relatedProducts: [],
});

export const CurrentProductInfoModule = {
    namespaced: true,

    state: defaultState(),

    getters,
    actions,

    mutations: {
        ...mutations,
        clearAll(state) {
            Object.assign(state, defaultState());
        },
    },
};
