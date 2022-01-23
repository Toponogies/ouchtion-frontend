export default {
    setLoading(state, loading) {
        state.isLoading = loading;
    },

    setModalOpen(state, open) {
        state.isModalOpen = open;
    },

    setSignInError(state, message) {
        state.signInError = message;
    },

    setSignUpError(state, message) {
        state.signUpError = message;
    },

    setResetPassError(state, message) {
        state.resetPassError = message;
    },

    setAccessToken: (state, accessToken) => {
        state.accessToken = accessToken;
    },

    setRefreshToken: (state, refreshToken) => {
        state.refreshToken = refreshToken;
    },

    setUser(state, user) {
        state.id = user.user_id;
        state.username = user.full_name;
        state.email = user.email;
        state.dob = user.dob;
        state.address = user.address;
        state.rating = user.point;
        state.role = user.role;
    },
};
