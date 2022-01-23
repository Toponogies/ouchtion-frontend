import actions from "./actions";
import mutations from "./mutations";

export const CurrentUserModule = {
    namespaced: true,

    state: {
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
    },

    actions,
    mutations,
};
