import { getResults } from "@/api/search";
import { getUserWithPoint } from "@/api/user";
import { HOME_FEATURED_PRODUCTS_LIMIT, IMAGE_API_ENDPOINT, SEARCH_ORDER } from "@/utils/constants";
import { showSnack } from "@/utils/showSnack";

export default {
    fetchAll({ dispatch }) {
        dispatch("getProductsEndingSoon");
        dispatch("getProductsMostBidders");
        dispatch("getProductsHighestPrice");
    },

    async getProductsEndingSoon({ commit }) {
        commit("setProductsEndingSoonLoading", true);

        let params = { sort: SEARCH_ORDER.TIME_ASC, number: HOME_FEATURED_PRODUCTS_LIMIT };
        let products = await getResults(params);

        if (products) {
            products = products.map(async (product) => {
                let user = await getUserWithPoint(product.buyer_id);
                return {
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
                };
            });
            commit("updateProductsEndingSoon", products);
        } else {
            showSnack(`Failed to get featured products in "Ending Soon"`);
        }

        commit("setProductsEndingSoonLoading", false);
    },

    async getProductsMostBidders({ commit }) {
        commit("setProductsMostBiddersLoading", true);

        let params = { sort: SEARCH_ORDER.BIDDING_DESC, number: HOME_FEATURED_PRODUCTS_LIMIT };
        let products = await getResults(params);

        if (products) {
            products = products.map(async (product) => {
                let user = await getUserWithPoint(product.buyer_id);
                return {
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
                };
            });
            commit("updateProductsMostBidders", products);
        } else {
            showSnack(`Failed to get featured products in "Most Bidders"`);
        }

        commit("setProductsMostBiddersLoading", false);
    },

    async getProductsHighestPrice({ commit }) {
        commit("setProductHighestPriceLoading", true);

        let params = { sort: SEARCH_ORDER.PRICE_DESC, number: HOME_FEATURED_PRODUCTS_LIMIT };
        let products = await getResults(params);

        if (products) {
            products = products.map(async (product) => {
                let user = await getUserWithPoint(product.buyer_id);
                return {
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
                };
            });
            commit("updateProductsHighestPrice", products);
        } else {
            showSnack(`Failed to get featured products in "Highest Price"`);
        }

        commit("setProductHighestPriceLoading", false);
    },
};
