import { getResults, getResultCount } from "@/api/search";
import { getUserWithPoint } from "@/api/user";
import { IMAGE_API_ENDPOINT, SEARCH_RESULTS_PER_PAGE, SEARCH_TYPES } from "@/utils/constants";
import { showSnack } from "@/utils/showSnack";

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

    async fetchResult({ commit, state }) {
        let keyword, category;
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

        let total = await getResultCount(keyword, category);
        total = total.length;

        let params = {
            query: keyword,
            category: category,
            number: SEARCH_RESULTS_PER_PAGE,
            page: state.queryPage - 1,
        };

        let products = await getResults(params);

        if (products) {
            let result = [];
            products.forEach(async (product) => {
                let user = await getUserWithPoint(product.buyer_id);
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
        } else {
            showSnack(`Failed to get search results`);
        }
    },
};
