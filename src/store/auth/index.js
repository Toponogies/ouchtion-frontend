import actions from "./actions";
import mutations from "./mutations";

export const AuthModule = {
    state: {
        accessToken: null,
        refreshToken: null,
        loggingIn: false,
        loginError: null,
        refreshError: null,
        registerError: null,
        logoutError: null,
        resetError: null,
    },
    actions: actions,
    mutations: mutations,
};
