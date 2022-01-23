import actions from "./actions";
import mutations from "./mutations";

const defaultState = () => ({
    isLoading: false,
    images: [],
});

export const CurrentProductImagesModule = {
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
