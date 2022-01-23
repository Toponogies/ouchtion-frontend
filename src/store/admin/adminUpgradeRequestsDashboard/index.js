import actions from "./actions";
import mutations from "./mutations";

const defaultState = () => ({
    isLoading: false,
    headers: [
        { value: "dummyAvatar", sortable: false, width: "128px" },
        { text: "Full Name", value: "full_name" },
        { text: "Email", value: "email" },
        { text: "Rating", value: "rating" },
        { value: "data-table-expand" },
    ],
    items: [],
});

export const AdminUpgradeRequestsDashboardModule = {
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
