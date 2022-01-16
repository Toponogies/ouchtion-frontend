export default {
    setLoadingState(state, isLoading) {
        state.isLoading = isLoading;
    },
    setItems(state, items) {
        state.watchlistItems = items;
    },
    removeItem(state, id) {
        state.watchlistItems = state.watchlistItems.filter((each) => each.id !== id);
    },
};
