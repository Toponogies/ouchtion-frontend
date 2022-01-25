export default {
    setQuery(state, { type, content, page, sort }) {
        state.queryType = type;
        state.queryContent = content;
        state.queryPage = page;
        state.querySort = sort;
    },

    setResult(state, { total, result }) {
        state.resultTotalCount = total;
        state.resultCurrentContent = result;
    },
};
