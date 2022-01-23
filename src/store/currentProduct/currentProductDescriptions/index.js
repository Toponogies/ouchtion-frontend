import actions from "./actions";
import mutations from "./mutations";

export const CurrentProductDescriptionsModule = {
    namespaced: true,

    state: {
        isLoading: false,
        primaryDescription: null,
        secondaryDescriptions: [],
    },

    actions,
    mutations,
};
