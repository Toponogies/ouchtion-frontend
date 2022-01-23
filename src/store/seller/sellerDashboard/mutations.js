import { findIndex } from "lodash-es";

export default {
    setOngoingProductsLoadingState(state, isLoading) {
        state.ongoingProducts.isLoading = isLoading;
    },

    setOngoingProductsItems(state, items) {
        state.ongoingProducts.items = items;
    },

    setCompletedProductsLoadingState(state, isLoading) {
        state.completedProducts.isLoading = isLoading;
    },

    setCompletedProductsItems(state, items) {
        state.completedProducts.items = items;
    },

    setCompletedBidReview(state, { id, rating, comment }) {
        const targetIndex = findIndex(state.completedProducts.items, { id });
        const targetItem = {
            ...state.completedProducts.items[targetIndex],
            reviewToBidder: { rating, comment },
        };
        state.completedProducts.items.splice(targetIndex, 1, targetItem);
    },

    // eslint-disable-next-line no-unused-vars
    clearAll(state) {
        state.ongoingProducts = {
            ...state.ongoingProducts,
            isLoading: false,
            items: [],
        };
        state.completedProducts = {
            ...state.completedProducts,
            isLoading: false,
            items: [],
        };
    },
};
