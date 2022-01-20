import { HOME_FEATURED_PRODUCTS_LIMIT } from "@/utils/constants";
import axios from "axios";

export default {
    async fetchAll({ commit }) {
        try{
            let products = await axios.get("http://localhost:3000/api/products", { params: { sort: "time_desc",number: HOME_FEATURED_PRODUCTS_LIMIT } }).then((response) => {
                return response.data;
            })
            let user = null
            let productsEndingSoon = []
            products.forEach(product => {
                user = axios.get(`http://localhost:3000/api/users/${product.buyer_id}/point`)
                productsEndingSoon.push({
                    id: product.product_id,
                    title: product.name,
                    image: "http://localhost:3000/"+ product.avatar,
                    bidderCount: product.bidding_count,
                    bidHighestPrice: product.current_price,
                    bidHighestUser: user.full_name,
                    buyNowPrice: product.buy_price,
                    startTime: product.start_at,
                    endTime: product.end_at,
                    isOnWatchlist: false,
                })
            });
            
            commit("updateProductsEndingSoon", productsEndingSoon);

            products = await axios.get("http://localhost:3000/api/products", { params: { sort: "bidding_desc",number: HOME_FEATURED_PRODUCTS_LIMIT } }).then((response) => {
                return response.data;
            })
            let productsMostBidders = []
            products.forEach(product => {
                user = axios.get(`http://localhost:3000/api/users/${product.buyer_id}/point`)
                productsMostBidders.push({
                    id: product.product_id,
                    title: product.name,
                    image: "http://localhost:3000/"+ product.avatar,
                    bidderCount: product.bidding_count,
                    bidHighestPrice: product.current_price,
                    bidHighestUser: user.full_name,
                    buyNowPrice: product.buy_price,
                    startTime: product.start_at,
                    endTime: product.end_at,
                    isOnWatchlist: false,
                })
            });
            commit("updateProductsMostBidders", productsMostBidders);
    
            products = await axios.get("http://localhost:3000/api/products", { params: { sort: "price_desc",number: HOME_FEATURED_PRODUCTS_LIMIT } }).then((response) => {
                return response.data;
            })
            let productsHighestPrice = []
            products.forEach(product => {
                user = axios.get(`http://localhost:3000/api/users/${product.buyer_id}/point`)
                productsHighestPrice.push({
                    id: product.product_id,
                    title: product.name,
                    image: "http://localhost:3000/"+ product.avatar,
                    bidderCount: product.bidding_count,
                    bidHighestPrice: product.current_price,
                    bidHighestUser: user.full_name,
                    buyNowPrice: product.buy_price,
                    startTime: product.start_at,
                    endTime: product.end_at,
                    isOnWatchlist: false,
                })
            });
            commit("updateProductsHighestPrice", productsHighestPrice);
        }
        catch(error){
            console.log(error.response.data);
        }
    },
};
