import actions from "./actions";
import mutations from "./mutations";

export const AdminUpgradeRequestsDashboardModule = {
    namespaced: true,

    state: {
        isLoading: false,
        headers: [
            { value: "dummyAvatar", sortable: false, width: "128px" },
            { text: "Full Name", value: "full_name" },
            { text: "Email", value: "email" },
            { text: "Rating", value: "rating" },
            { value: "data-table-expand" },
        ],
        items: [],
    },

    actions,
    mutations,
};
