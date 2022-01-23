export default {
    setIsOnWatchlist(state, isOnWatchlist) {
        state.isOnWatchlist = isOnWatchlist;
    },

    setBidModalState(state, open) {
        state.bid.isModalOpen = open;
    },

    setBidRequestModalState(state, open) {
        state.request.isModalOpen = open;
    },

    setBuyNowModalState(state, open) {
        state.buyNow.isModalOpen = open;
    },

    setBidAvailability(state, availability) {
        state.bidAvailability = availability;
    },

    setAutoBidState(state, open) {
        state.bid.isAutoBidEnabled = open;
    },

    // eslint-disable-next-line no-unused-vars
    clearAll(state) {
        state = {
            bid: {
                isModalOpen: false,
                isAutoBidEnabled: false,
            },
            buyNow: {
                isModalOpen: false,
            },
            bidAvailability: null,
            isOnWatchlist: false,
            request: {
                isModalOpen: false,
            },
        };
    },
};
