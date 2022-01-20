import actions from "./actions";
import mutations from "./mutations";

export const AuthModule = {
    namespaced: true,

    state: {
        accessToken: null,
        refreshToken: null,
        loggingIn: false,
        loginError: null,
        refreshError: null,

        // modal
        isModalOpened: false,
    },

    actions,
    mutations,
};
