import { findIndex } from "lodash-es";

export default {
    appendProductDescriptions(state, payload) {
        state.secondaryDescriptions.push(payload);
    },

    setAppendDescriptionModalState(state, open) {
        state.isAppendDescriptionOpen = open;
    },

    setBidderRequests(state, requests) {
        state.bidRequests.items = requests;
    },

    removeBidderRequest(state, requestId) {
        const targetIndex = findIndex(state.bidRequests.items, { requestId });
        state.bidRequests.items.splice(targetIndex, 1);
    },

    // eslint-disable-next-line no-unused-vars
    clearAll(state) {
        state = {
            ...state,
            bidRequests: {
                ...state.bidRequests,
                items: [],
            },
            isAppendDescriptionOpen: false,
        };
    },
};
