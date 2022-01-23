import { SEARCH_PAGINATION_VISIBLE_PAGES, SEARCH_RESULTS_PER_PAGE } from "@/utils/constants";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const defaultState = () => ({
    // query
    queryType: null,
    queryContent: null,
    queryLimit: SEARCH_RESULTS_PER_PAGE,
    queryPage: null,

    // result
    resultTotalCount: 0,
    resultCurrentContent: null,
    resultPagerVisibleCount: SEARCH_PAGINATION_VISIBLE_PAGES,
});

export const SearchModule = {
    namespaced: true,

    state: defaultState(),

    getters,
    actions,

    mutations: {
        ...mutations,
        clearAll(state) {
            Object.assign(state, defaultState());
        },
    },
};
