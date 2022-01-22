import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

export const CurrentProductModule = {
    namespaced: true,

    state: {
        id: null,

        // product basic info
        title: null,
        seller: {
            id: null,
            username: null,
            rating: 0.0,
        },
        startTime: null,
        endTime: null,
        categories: [],

        // product description
        primaryDescription: null,
        secondaryDescriptions: [],

        // product images
        primaryImage: null,
        secondaryImages: [],

        // bid & buy now
        bid: {
            highestPrice: null,
            highestUser: {
                username: null,
                rating: 0.0,
            },
            priceIncrement: null,
            biddings: [],
            isModalOpen: false,
            isAutoBidEnabled: false,
        },
        buyNow: {
            price: null,
            isModalOpen: false,
        },

        // current user status for this product
        isBlockedFromBidding: false,
        isOnWatchlist: false,

        // related products
        relatedProducts: [],

        // append description modal
        isAppendDescriptionOpen: false,
    },

    getters,
    actions,
    mutations,
};
