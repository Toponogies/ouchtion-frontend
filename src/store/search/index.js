import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

import { SEARCH_RESULTS_PER_PAGE, SEARCH_PAGINATION_VISIBLE_PAGES } from "@/utils/constants";

export const SearchModule = {
    namespaced: true,

    state: {
        // query
        queryType: null,
        queryContent: null,
        queryLimit: SEARCH_RESULTS_PER_PAGE,
        queryPage: null,

        // result
        resultTotalCount: 0,
        resultCurrentContent: null,
        resultPagerVisibleCount: SEARCH_PAGINATION_VISIBLE_PAGES,
    },

    getters,
    actions,
    mutations,
};
