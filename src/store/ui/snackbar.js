export const SnackbarModule = {
    state: {
        text: "",
    },
    actions: {
        showSnackbar({ commit }, payload) {
            commit("showSnackbar", payload);
        },
    },
    mutations: {
        showSnackbar(state, snackInfo) {
            const { text } = snackInfo;
            state.text = text;
        },
    },
};
