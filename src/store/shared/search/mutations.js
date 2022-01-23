export default {
    setQuery(state, { type, content, page }) {
        state.queryType = type;
        state.queryContent = content;
        state.queryPage = page;
    },

    setResult(state, { total, result }) {
        state.resultTotalCount = total;
        state.resultCurrentContent = result;
    },
};
