import { sellerFinishedProduct, sellerOnGoingProduct } from "@/api/product";
import { getRates, getRatesProduct } from "@/api/rate";
import { IMAGE_API_ENDPOINT } from "@/utils/constants";
import { showSnack } from "@/utils/showSnack";

export default {
    async fetchOngoing({ commit }) {
        commit("setOngoingProductsLoadingState", true);

        let products = await sellerOnGoingProduct();

        if (products) {
            products = products.map((product) => ({
                primaryImage: `${IMAGE_API_ENDPOINT}/${product.avatar}`,
                id: product.product_id,
                name: product.name,
                endTime: product.end_at,
                highestBidPrice: product.current_price,
            }));
            commit("setOngoingProductsItems", products);
        } else {
            showSnack(`Failed to get ongoing product list`);
        }

        commit("setOngoingProductsLoadingState", false);
    },

    async fetchCompleted({ commit }) {
        commit("setCompletedProductsLoadingState", true);

        let products = await sellerFinishedProduct();
        if (products) {
            let data = [];

            products?.forEach(async (product) => {
                let rates = await getRatesProduct(product.product_id);

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
            commit("setCompletedProductsItems", data);
        } else {
            showSnack(`Failed to get completed products list`);
        }

        commit("setCompletedProductsLoadingState", false);
    },

    async leaveReviewCompleted({ commit }, { id, rating, comment }) {
        commit("setCompletedProductsLoadingState", true);

        let payload = {
            product_id: id,
            rate: rating,
            comment: comment ? comment : "",
        };
        let result = await getRates(payload);

        if (result) {
            commit("setCompletedBidReview", { id, rating, comment });
            showSnack(`Review submitted for product id = ${id}`);
        } else {
            showSnack(`Failed to submit review for product id = ${id}`);
        }

        commit("setCompletedProductsLoadingState", false);
    },
};
