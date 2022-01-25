export default {
    setQuery(state, { type, content, sort, page }) {
        state.queryType = type;
        state.queryContent = content;
        state.querySort = sort;
        state.queryPage = page;
    },

    setResult(state, { total, result }) {
        state.resultTotalCount = total;
        state.resultCurrentContent = result;
    },
};
