import actions from "./actions";
import mutations from "./mutations";

export const defaultState = () => ({
    ongoingBids: {
        isLoading: false,
        headers: [
            { text: "Image", value: "primaryImage", sortable: false, width: "96px" }, // 64 + 2*16 = 96
            { text: "Product Name", value: "name" },
            { text: "Ends at", value: "endTime" },
            { text: "Price (\u20AB)", value: "highestBidPrice" },
            { text: "Actions", value: "actions", sortable: false, align: "end" },
        ],
        items: [],
    },

    completedBids: {
        isLoading: false,
        headers: [
            { text: "Image", value: "primaryImage", sortable: false, width: "96px" }, // 64 + 2*16 = 96
            { text: "Product Name", value: "name" },
            { text: "Final Price (\u20AB)", value: "highestBidPrice" },
            { text: "Actions", value: "actions", sortable: false, align: "end" },
            { value: "data-table-expand" },
        ],
        items: [],
    },
});

export const BidderDashboardModule = {
    namespaced: true,

    state: defaultState(),

    actions,

    mutations: {
        ...mutations,
        clearAll(state) {
            Object.assign(state, defaultState());
        },
    },
};
