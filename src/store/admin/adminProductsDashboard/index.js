import actions from "./actions";
import mutations from "./mutations";

export const AdminProductsDashboardModule = {
    namespaced: true,

    state: {
        isLoading: false,
        headers: [
            { text: "Image", value: "primaryImage", sortable: false, width: "96px" }, // 64 + 2*16 = 96
            { text: "Product Name", value: "name" },
            { text: "Ends at", value: "endTime" },
            { text: "Price (\u20AB)", value: "highestBidPrice" },
            { value: "isSold" },
            { text: "Actions", value: "actions", sortable: false, align: "end" },
        ],
        items: [],
    },

    actions,
    mutations,
};
