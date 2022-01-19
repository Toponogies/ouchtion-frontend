import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

export const CategoryModule = {
    namespaced: true,

    state: {
        categories: [],
    },

    getters,
    actions,
    mutations,
};
