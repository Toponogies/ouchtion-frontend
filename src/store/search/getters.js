export default {
    resultPageCount(state) {
        return Math.ceil(state.resultTotalCount / state.queryLimit);
    },
};
