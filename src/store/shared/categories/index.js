import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const defaultState = () => ({
    isLoading: false,
    categories: [],
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
