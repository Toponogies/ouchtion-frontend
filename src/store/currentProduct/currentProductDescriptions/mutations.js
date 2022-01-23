export default {
    setLoading(state, loading) {
        state.isLoading = loading;
    },

    setPrimary(state, description) {
        state.primaryDescription = description;
    },

    setSecondary(state, descriptions) {
        state.secondaryDescriptions = descriptions;
    },

    addSecondary(state, description) {
        state.secondaryDescriptions.push(description);
    },
};
