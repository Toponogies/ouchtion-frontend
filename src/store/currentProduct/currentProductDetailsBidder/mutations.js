export default {
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
};
