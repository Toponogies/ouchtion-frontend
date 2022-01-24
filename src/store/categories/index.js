import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const defaultState = () => ({
    categories: [],
    category: null,
});

export const CategoryModule = {
    namespaced: true,

    state: defaultState(),

    getters,
    actions,

    mutations: {
        ...mutations,
        clearAll(state) {
            Object.assign(state, defaultState());
        },
    },
};
