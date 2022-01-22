import { sellerFinishedProduct, sellerOnGoingProduct } from "@/api/product";
import { getRates } from "@/api/rate";
import { API_ENDPOINTS, IMAGE_API_ENDPOINT } from "@/utils/constants";
import { showSnack } from "@/utils/showSnack";
import axios from "axios";

export default {
    async fetchOngoing({ commit, rootState }) {
        commit("setOngoingProductsLoadingState", true);
        const data = [];
        let products = [];

        try {
            products = await sellerOnGoingProduct(rootState.AuthModule.accessToken);
        } catch (error) {
            console.log(error);
        }
        products?.forEach((product) => {
            data.push({
                primaryImage: `${IMAGE_API_ENDPOINT}/${product.avatar}`,
                id: product.product_id,
                name: product.name,
                endTime: product.end_at,
                highestBidPrice: product.current_price,
            });
        });

        setTimeout(() => {
            commit("setOngoingProductsItems", data);
            commit("setOngoingProductsLoadingState", false);
        }, 500);
    },

    async fetchCompleted({ commit, rootState }) {
        commit("setCompletedProductsLoadingState", true);
        const data = [];
        let products = [];
        try {
            products = await sellerFinishedProduct(rootState.AuthModule.accessToken);
            rates = await getRates(rootState.AuthModule.accessToken);
        } catch (error) {
            console.log(error);
        }
        products?.forEach(async (product) => {
            let rates = await axios
                .get(`${API_ENDPOINTS.PRODUCTS}/${product.product_id}/rate`)
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    console.log(error);
                    return [];
                });

            let reviewToBidder = {
                rating: null,
                comment: null,
            };

            let reviewToSeller = {
                rating: null,
                comment: null,
            };

            rates?.forEach((rate) => {
                if (rate.type === "SELLER-BUYER" && rate.product_id === product.product_id) {
                    reviewToBidder = {
                        rating: rate.rate,
                        comment: rate.comment,
                    };
                }
                if (rate.type === "BUYER-SELLER" && rate.product_id === product.product_id) {
                    reviewToSeller = {
                        rating: rate.rate,
                        comment: rate.comment,
                    };
                }
            });
            data.push({
                primaryImage: `${IMAGE_API_ENDPOINT}/${product.avatar}`,
                id: product.product_id,
                name: product.name,
                highestBidPrice: product.current_price,

                // seller -> bidder, read-only
                reviewToBidder: reviewToBidder,

                // bidder -> seller, can only write once
                reviewToSeller: reviewToSeller,
            });
        });

        setTimeout(() => {
            commit("setCompletedProductsItems", data);
            commit("setCompletedProductsLoadingState", false);
        }, 500);
    },

    async leaveReviewCompleted({ commit, rootState }, { id, rating, comment }) {
        commit("setCompletedProductsLoadingState", true);

        const headers = {
            Authorization: "Bearer " + rootState.AuthModule.accessToken,
        };
        let payload = {
            product_id: id,
            rate: rating,
            comment: comment ? comment : "",
        };
        const success = await axios
            .post(`${API_ENDPOINTS.USERS}/rate`, payload, { headers })
            .then(() => true)
            .catch((err) => {
                console.log(err);
                showSnack(`Failed to submit review for product id = ${id}`);
                return false;
            });

        if (success) {
            commit("setCompletedBidReview", { id, rating, comment });
            commit("setCompletedProductsLoadingState", false);
            showSnack(`Review submitted for product id = ${id}`);
        }
    },
};
