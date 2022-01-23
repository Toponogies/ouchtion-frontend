import { findIndex } from "lodash-es";

export default {
    setLoading(state, loading) {
        state.isLoading = loading;
    },

    setItems(state, items) {
        state.items = items;
    },

    remove(state, id) {
        const targetIndex = findIndex(state.items, { userId: id });
        state.items.splice(targetIndex, 1);
    },
};
