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

    // eslint-disable-next-line no-unused-vars
    clearAll(state) {
        state = {
            isModalOpened: false,
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
        };
    },
};
