export default {
    loginStart: (state) => (state.loggingIn = true),
    logout: (state) => (state.loggingIn = false),
    loginStop: (state, errorMessage) => {
        state.loggingIn = false;
        state.loginError = errorMessage;
    },
    updateAccessToken: (state, accessToken) => {
        state.accessToken = accessToken;
    },
    updateRefreshToken: (state, refreshToken) => {
        state.refreshToken = refreshToken;
    },
    refreshStop: (state, errorMessage) => {
        state.refreshError = errorMessage;
    },
    registerStop: (state, errorMessage) => {
        state.registerError = errorMessage;
    },
    logoutStop: (state, errorMessage) => {
        state.logoutError = errorMessage;
    },
    resetStop: (state, errorMessage) => {
        state.resetError = errorMessage;
    },

    // modal
    setModalState(state, isOpen) {
        state.isModalOpened = isOpen;
    },
};
