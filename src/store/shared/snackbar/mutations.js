export default {
    showSnackbar(state, snackInfo) {
        const { text } = snackInfo;
        state.text = text;
    },
};
