import actions from "./actions";
import mutations from "./mutations";

export const CurrentProductDetailsSellerModule = {
    namespaced: true,

    state: {
        bidRequests: {
            headers: [
                { text: "Request #", value: "requestId", sortable: false },
                { text: "Username", value: "username" },
                { text: "User rating", value: "rating" },
                { value: "actions", align: "end" },
            ],
            items: [],
        },

        isAppendDescriptionOpen: false,
    },

    actions,
    mutations,
};
