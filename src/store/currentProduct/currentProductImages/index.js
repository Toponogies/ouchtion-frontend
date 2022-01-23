import actions from "./actions";
import mutations from "./mutations";

export const CurrentProductImagesModule = {
    namespaced: true,

    state: {
        isLoading: false,
        images: [],
    },

    actions,
    mutations,
};
