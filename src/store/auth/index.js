import actions from "./actions";
import mutations from "./mutations";

const defaultState = () => ({
    accessToken: null,
    refreshToken: null,
    loggingIn: false,
    loginError: null,
    refreshError: null,

    // modal
    isModalOpened: false,
    verifySuccess: null,
    resetPassSuccess: null,
});

export const AuthModule = {
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
