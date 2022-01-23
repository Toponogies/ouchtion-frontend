import actions from "./actions";
import mutations from "./mutations";

const defaultState = () => ({
    isModalOpen: false,
    isLoading: false,

    accessToken: null,
    refreshToken: null,
    id: null,
    role: null,

    username: null,
    email: null,
    dob: null,
    address: null,
    rating: 0.0,

    signInError: null,
    signUpError: null,
    resetPassError: null,
});

export const CurrentUserModule = {
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
