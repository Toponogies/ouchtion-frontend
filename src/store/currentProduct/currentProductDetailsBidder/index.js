import actions from "./actions";
import mutations from "./mutations";

export const CurrentProductDetailsBidderModule = {
    namespaced: true,

    state: {
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
    },

    actions,
    mutations,
};
