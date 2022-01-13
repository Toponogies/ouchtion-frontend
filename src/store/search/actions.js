import { generateMockProductTotalCount, generateMockProduct } from "@/utils/mockUtils";
import { SEARCH_TYPES, SEARCH_RESULTS_PER_PAGE } from "@/utils/constants";

export default {
    setQuery({ commit }, { keyword, categoryId, page }) {
        let type, content;
        if (keyword) {
            type = SEARCH_TYPES.KEYWORD;
            content = keyword;
        } else if (categoryId) {
            type = SEARCH_TYPES.CATEGORY;
            content = categoryId;
        }

        let _page = 1;
        if (page) _page = page;

        commit("setQuery", { type, content, page: _page });
    },

    fetchResult({ commit, state }) {
        let total, result;
        switch (state.queryType) {
            case SEARCH_TYPES.KEYWORD:
                console.log(`Calling search API with: keyword = ${state.queryContent}, page = ${state.queryPage}`);
                break;
            case SEARCH_TYPES.CATEGORY:
                console.log(`Calling search API with: category ID = ${state.queryContent}, page = ${state.queryPage}`);
                break;
        }

        total = generateMockProductTotalCount();
        result = generateMockProduct(
            state.queryPage * SEARCH_RESULTS_PER_PAGE > total
                ? total - (state.queryPage - 1) * SEARCH_RESULTS_PER_PAGE
                : SEARCH_RESULTS_PER_PAGE
        );

        commit("setResult", { total, result });
    },
};
