import { sellerFinishedProduct, sellerOnGoingProduct } from "@/api/product";
import { getRates } from "@/api/rate";
import { IMAGE_API_ENDPOINT } from "@/utils/constants";
import { showSnack } from "@/utils/showSnack";

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
        let rates = [];

        try {
            products = await sellerFinishedProduct(rootState.AuthModule.accessToken);
            rates = await getRates(rootState.AuthModule.accessToken);
        } catch (error) {
            console.log(error);
        }


        products?.forEach(async (product) => {
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

    leaveReviewCompleted({ commit }, { id, rating, comment }) {
        commit("setCompletedProductsLoadingState", true);
        setTimeout(() => {
            commit("setCompletedBidReview", { id, rating, comment });
            commit("setCompletedProductsLoadingState", false);
            showSnack(`Review submitted for bid id: ${id}`);
        }, 250);
    },
};
