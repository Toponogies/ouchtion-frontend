import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const defaultState = () => ({
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
    isSold: false,

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
    bidAvailability: null,

    // bidding requests (bidder's button)
    request: {
        isSent: false,
        isModalOpen: false,
        isBlockedFromRequesting: false,
    },

    // bidding requests (seller's table)
    bidRequests: {
        headers: [
            { text: "Request #", value: "requestId", sortable: false },
            { text: "Username", value: "username" },
            { text: "User rating", value: "rating" },
            { value: "actions", align: "end" },
        ],
        items: [],
    },

    // related products
    relatedProducts: [],

    // append description modal
    isAppendDescriptionOpen: false,
});

export const CurrentProductModule = {
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
