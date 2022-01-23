import { findIndex } from "lodash-es";

export default {
    setOngoingBidsLoadingState(state, isLoading) {
        state.ongoingBids.isLoading = isLoading;
    },

    setOngoingBidsItems(state, items) {
        state.ongoingBids.items = items;
    },

    setCompletedBidsLoadingState(state, isLoading) {
        state.completedBids.isLoading = isLoading;
    },

    setCompletedBidsItems(state, items) {
        state.completedBids.items = items;
    },

    setCompletedBidReview(state, { id, rating, comment }) {
        const targetIndex = findIndex(state.completedBids.items, { id });
        const targetItem = {
            ...state.completedBids.items[targetIndex],
            reviewToSeller: { rating, comment },
        };
        state.completedBids.items.splice(targetIndex, 1, targetItem);
    },
};
