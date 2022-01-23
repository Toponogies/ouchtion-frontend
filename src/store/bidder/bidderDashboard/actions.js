import { bidderCompleteProduct, bidderOngoingProduct } from "@/api/product";
import { getRates, getRatesProduct } from "@/api/rate";
import { IMAGE_API_ENDPOINT } from "@/utils/constants";
import { showSnack } from "@/utils/showSnack";

export default {
    async getOngoing({ commit }) {
        commit("setOngoingBidsLoadingState", true);

        let products = await bidderOngoingProduct();
        if (products) {
            products = products.map((product) => ({
                primaryImage: `${IMAGE_API_ENDPOINT}/${product.avatar}`,
                id: product.product_id,
                name: product.name,
                endTime: product.end_at,
                highestBidPrice: product.current_price,
            }));
            commit("setOngoingBidsItems", products);
        } else {
            showSnack(`Failed to get ongoing bid list`);
        }

        commit("setOngoingBidsLoadingState", false);
    },

    async getCompleted({ commit }) {
        commit("setCompletedBidsLoadingState", true);

        let products = await bidderCompleteProduct();
        if (products) {
            let data = [];
            products.forEach(async (product) => {
                let rates = await getRatesProduct(product.product_id);
                if (rates === null) return;

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
                    reviewToBidder: reviewToBidder,
                    reviewToSeller: reviewToSeller,
                });
            });
            commit("setCompletedBidsItems", data);
        } else {
            showSnack(`Failed to get completed bids list`);
        }

        commit("setCompletedBidsLoadingState", false);
    },

    async leaveReviewCompleted({ commit }, { id, rating, comment }) {
        commit("setCompletedBidsLoadingState", true);

        let payload = {
            product_id: id,
            rate: rating,
            comment: comment ? comment : "",
        };
        const success = await getRates(payload);

        if (success) {
            commit("setCompletedBidReview", { id, rating, comment });
            showSnack(`Review submitted for product id = ${id}`);
        } else {
            showSnack(`Failed to submit review for product id = ${id}`);
        }

        commit("setCompletedBidsLoadingState", false);
    },
};
