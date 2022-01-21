import { getData } from "@/api/search";
import { getUserWithPoint } from "@/api/user";
import { IMAGE_API_ENDPOINT, HOME_FEATURED_PRODUCTS_LIMIT } from "@/utils/constants";

export default {
    async fetchAll({ commit }) {
        try {
            let params1 = { sort: "time_desc", number: HOME_FEATURED_PRODUCTS_LIMIT }
            let products = await getData(params1);

            let user = null;
            let productsEndingSoon = [];
            products.forEach(async(product) => {
                user = await getUserWithPoint(product.buyer_id);
                productsEndingSoon.push({
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

            commit("updateProductsEndingSoon", productsEndingSoon);

            let params2 = { sort: "bidding_desc", number: HOME_FEATURED_PRODUCTS_LIMIT }
            products = await getData(params2);

            let productsMostBidders = [];
            products.forEach(async(product) => {
                user = await getUserWithPoint(product.buyer_id);
                productsMostBidders.push({
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
            commit("updateProductsMostBidders", productsMostBidders);

            
            let params3 = { sort: "price_asc", number: HOME_FEATURED_PRODUCTS_LIMIT }
            products = await getData(params3);

            let productsHighestPrice = [];
            products.forEach(async(product) => {
                user = await getUserWithPoint(product.buyer_id);
                productsHighestPrice.push({
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
            commit("updateProductsHighestPrice", productsHighestPrice);
        } catch (error) {
            console.log(error);
        }
    },
};
