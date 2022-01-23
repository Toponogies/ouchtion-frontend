import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export const CategoryModule = {
    namespaced: true,

    state: {
        isLoading: false,
        categories: [],
    },

    getters,
    actions,
    mutations,
};
