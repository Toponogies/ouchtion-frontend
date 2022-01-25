import { getData, getTotal } from "@/api/search";
import { getUserWithPoint } from "@/api/user";
import { SEARCH_TYPES, SEARCH_RESULTS_PER_PAGE, IMAGE_API_ENDPOINT, SEARCH_ORDER } from "@/utils/constants";

export default {
    setQuery({ commit }, { keyword, categoryId, sort, page }) {
        let type, content;
        if (keyword) {
            type = SEARCH_TYPES.KEYWORD;
            content = keyword;
        } else if (categoryId) {
            type = SEARCH_TYPES.CATEGORY;
            content = categoryId;
        }

        let _sort = SEARCH_ORDER.TIME_ASC;
        if (sort) _sort = sort;

        let _page = 1;
        if (page) _page = page;

        commit("setQuery", { type, content, page: _page, sort: _sort });
    },

    async fetchResult({ commit, state }) {
        let total,
            result = [];
        let keyword = undefined;
        let category = undefined;
        let sort = state.querySort;
        let products = [];
        switch (state.queryType) {
            case SEARCH_TYPES.KEYWORD:
                keyword = state.queryContent;
                console.log(`Calling search API with: keyword = ${state.queryContent}, page = ${state.queryPage}`);
                break;
            case SEARCH_TYPES.CATEGORY:
                category = state.queryContent;
                console.log(`Calling search API with: category ID = ${state.queryContent}, page = ${state.queryPage}`);
                break;
        }

        try {
            products = await getTotal(keyword, category, sort);

            total = products.length;

            let params = {
                query: keyword,
                category: category,
                number: SEARCH_RESULTS_PER_PAGE,
                page: state.queryPage - 1,
                sort,
            };

            products = await getData(params);

            let user = null;
            products.forEach(async (product) => {
                user = await getUserWithPoint(product.buyer_id);
                result.push({
                    id: product.product_id,
                    title: product.name,
                    image: `${IMAGE_API_ENDPOINT}/${product.avatar}`,
                    bidderCount: product.bidding_count,
                    bidHighestPrice: product.current_price,
                    bidHighestUser: user.full_name,
                    buyNowPrice: product.buy_price,
                    startTime: product.start_at,
                    endTime: product.end_at,
                    isOnWatchlist: false,
                });
            });

            commit("setResult", { total, result });
        } catch (error) {
            console.log(error);
        }
    },
};
