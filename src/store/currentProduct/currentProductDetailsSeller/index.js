import actions from "./actions";
import mutations from "./mutations";

const defaultState = () => ({
    bidRequests: {
        isLoading: false,
        headers: [
            { text: "Request #", value: "requestId", sortable: false },
            { text: "Username", value: "username" },
            { text: "User rating", value: "rating" },
            { value: "actions", align: "end" },
        ],
        items: [],
    },

    isAppendDescriptionOpen: false,
});

export const CurrentProductDetailsSellerModule = {
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
