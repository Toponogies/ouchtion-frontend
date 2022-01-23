export default {
    setLoading(state, loading) {
        state.isLoading = loading;
    },

    setItems(state, images) {
        state.images = images;
    },

    // eslint-disable-next-line no-unused-vars
    clearAll(state) {
        state = {
            images: [],
        };
    },
};
