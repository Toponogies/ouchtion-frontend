import { findIndex } from "lodash-es";

export default {
    setLoadingState(state, isLoading) {
        state.isLoading = isLoading;
    },
    setItems(state, items) {
        state.products = items;
    },
    removeItem(state, id) {
        const targetIndex = findIndex(state.products, { id });
        state.products.splice(targetIndex, 1);
    },
};
