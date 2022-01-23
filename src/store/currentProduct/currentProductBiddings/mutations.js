export default {
    setLoading(state, loading) {
        state.isLoading = loading;
    },

    setItems(state, biddings) {
        state.biddings = biddings;
    },

    addItem(state, bidding) {
        state.biddings.push(bidding);
    },

    // eslint-disable-next-line no-unused-vars
    clearAll(state) {
        state = {
            biddings: [],
        };
    },
};
