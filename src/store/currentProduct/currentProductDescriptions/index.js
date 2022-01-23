import actions from "./actions";
import mutations from "./mutations";

const defaultState = () => ({
    isLoading: false,
    primaryDescription: null,
    secondaryDescriptions: [],
});

export const CurrentProductDescriptionsModule = {
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
