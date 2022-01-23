import actions from "./actions";
import mutations from "./mutations";

export const CurrentProductBiddingsModule = {
    namespaced: true,

    state: {
        isLoading: false,
        biddings: [],
    },

    actions,
    mutations,
};
