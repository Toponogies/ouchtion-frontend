import { SEARCH_TYPES, SEARCH_RESULTS_PER_PAGE, API_ENDPOINTS, API_IMAGE_ENDPOINT } from "@/utils/constants";
import axios from "axios";

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
        let total,
            result = [];
        let keyword = undefined;
        let category = undefined;
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
            products = await axios
                .get(`${API_ENDPOINTS.PRODUCTS}`, {
                    params: {
                        query: keyword,
                        category: category,
                    },
                })
                .then((response) => {
                    return response.data;
                });

            total = products.length;

            products = await axios
                .get(`${API_ENDPOINTS.PRODUCTS}`, {
                    params: {
                        query: keyword,
                        category: category,
                        number: SEARCH_RESULTS_PER_PAGE,
                        page: state.queryPage - 1,
                    },
                })
                .then((response) => {
                    return response.data;
                });

            let user = null;
            products.forEach((product) => {
                user = axios.get(`${API_ENDPOINTS.USERS}/${product.buyer_id}/point`);
                result.push({
                    id: product.product_id,
                    title: product.name,
                    image: `${API_IMAGE_ENDPOINT}/${product.avatar}`,
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
            console.log(error.response.data);
        }
    },
};
