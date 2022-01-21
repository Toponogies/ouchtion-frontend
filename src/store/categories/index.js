import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

export const CategoryModule = {
    namespaced: true,

    state: {
        categories: [],
        category: null,
    },

    getters,
    actions,
    mutations,
};
