import actions from "./actions";
import mutations from "./mutations";

export const SnackbarModule = {
    namespaced: true,

    state: {
        text: "",
    },

    actions,
    mutations,
};
