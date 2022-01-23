import { findIndex } from "lodash-es";

export default {
    appendProductDescriptions(state, payload) {
        state.secondaryDescriptions.push(payload);
    },

    setAppendDescriptionModalState(state, open) {
        state.isAppendDescriptionOpen = open;
    },

    setBidderRequestsLoading(state, loading) {
        state.bidRequests.isLoading = loading;
    },

    setBidderRequests(state, requests) {
        state.bidRequests.items = requests;
    },

    removeBidderRequest(state, requestId) {
        const targetIndex = findIndex(state.bidRequests.items, { requestId });
        state.bidRequests.items.splice(targetIndex, 1);
    },
};
