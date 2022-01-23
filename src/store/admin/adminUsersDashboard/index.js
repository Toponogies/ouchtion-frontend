import actions from "./actions";
import mutations from "./mutations";

const defaultState = () => ({
    isLoading: false,
    headers: [
        { value: "dummyAvatar", sortable: false, width: "128px" },
        { text: "Full Name", value: "full_name" },
        { text: "Email", value: "email" },
        { text: "Role", value: "role" },
        { value: "actions", sortable: false, align: "end" },
    ],
    items: [],
});

export const AdminUsersDashboardModule = {
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
