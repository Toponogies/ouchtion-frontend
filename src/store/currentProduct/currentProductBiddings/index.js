import actions from "./actions";
import mutations from "./mutations";

const defaultState = () => ({
    isLoading: false,
    biddings: [],
});

export const CurrentProductBiddingsModule = {
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
