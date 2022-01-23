export default {
    setNewProductId(state, id) {
        state.newProductId = id;
    },

    // eslint-disable-next-line no-unused-vars
    clearAll(state) {
        state = {
            newProductId: null,
        };
    },
};
