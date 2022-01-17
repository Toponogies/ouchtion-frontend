import actions from "./actions";
import mutations from "./mutations";

export const CategoryModule = {
    namespaced: true,

    state: {
        categories: [],
    },

    actions,
    mutations,
};
