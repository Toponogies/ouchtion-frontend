import actions from "./actions";
import mutations from "./mutations";

const defaultState = () => ({
    // bid & buy now
    bid: {
        isModalOpen: false,
        isAutoBidEnabled: false,
    },
    buyNow: {
        isModalOpen: false,
    },

    // current user status for this product
    bidAvailability: null,
    isOnWatchlist: false,

    // bidder's "request to seller" modal
    request: {
        isModalOpen: false,
    },
});

export const CurrentProductDetailsBidderModule = {
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
