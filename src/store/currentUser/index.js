import actions from "./actions";
import mutations from "./mutations";

export const CurrentUserModule = {
    namespaced: true,

    state: {
        role: null,
        username: null,
        rating: 0.0,
    },

    actions,
    mutations,
};
