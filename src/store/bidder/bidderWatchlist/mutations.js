import { findIndex } from "lodash-es";

export default {
    setLoading(state, isLoading) {
        state.isLoading = isLoading;
    },

    setItems(state, items) {
        state.items = items;
    },

    add(state, item) {
        state.items.push(item);
    },

    remove(state, id) {
        const targetIndex = findIndex(state.items, { id });
        state.items.splice(targetIndex, 1);
    },
};
