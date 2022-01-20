import { API_ENDPOINTS, API_IMAGE_ENDPOINT, HOME_FEATURED_PRODUCTS_LIMIT } from "@/utils/constants";
import axios from "axios";

export default {
    async fetchAll({ commit }) {
        try {
            let products = await axios
                .get(`${API_ENDPOINTS.PRODUCTS}`, {
                    params: { sort: "time_desc", number: HOME_FEATURED_PRODUCTS_LIMIT },
                })
                .then((response) => {
                    return response.data;
                });
            let user = null;
            let productsEndingSoon = [];
            products.forEach((product) => {
                user = axios.get(`${API_ENDPOINTS.USERS}/${product.buyer_id}/point`);
                productsEndingSoon.push({
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

            commit("updateProductsEndingSoon", productsEndingSoon);

            products = await axios
                .get(`${API_ENDPOINTS.PRODUCTS}`, {
                    params: { sort: "bidding_desc", number: HOME_FEATURED_PRODUCTS_LIMIT },
                })
                .then((response) => {
                    return response.data;
                });
            let productsMostBidders = [];
            products.forEach((product) => {
                user = axios.get(`${API_ENDPOINTS.USERS}/${product.buyer_id}/point`);
                productsMostBidders.push({
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
            commit("updateProductsMostBidders", productsMostBidders);

            products = await axios
                .get(`${API_ENDPOINTS.PRODUCTS}`, {
                    params: { sort: "price_asc", number: HOME_FEATURED_PRODUCTS_LIMIT },
                })
                .then((response) => {
                    return response.data;
                });
            let productsHighestPrice = [];
            products.forEach((product) => {
                user = axios.get(`${API_ENDPOINTS.USERS}/${product.buyer_id}/point`);
                productsHighestPrice.push({
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
            commit("updateProductsHighestPrice", productsHighestPrice);
        } catch (error) {
            console.log(error.response.data);
        }
    },
};
