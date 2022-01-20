import { API_ENDPOINTS, IMAGE_API_ENDPOINT } from "@/utils/constants";
import { showSnack } from "@/utils/showSnack";
import axios from "axios";

export default {
    async fetchOngoing({ commit, rootState, dispatch }) {
        commit("setOngoingBidsLoadingState", true);
        const data = [];

        let products = await axios
            .get(`${API_ENDPOINTS.PRODUCTS}/bidding`, {
                headers: {
                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch(async (error) => {
                console.log(error);
                if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN") {
                    await dispatch("AuthModule/doRefresh", null, { root: true });
                    return await axios
                        .get(`${API_ENDPOINTS.PRODUCTS}/won`, {
                            headers: {
                                Authorization: "Bearer " + rootState.AuthModule.accessToken,
                            },
                        })
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                            return [];
                        });
                }
            });
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
            commit("setOngoingBidsItems", data);
            commit("setOngoingBidsLoadingState", false);
        }, 500);
    },

    async fetchCompleted({ commit, rootState, dispatch }) {
        commit("setCompletedBidsLoadingState", true);
        const data = [];

        let products = await axios
            .get(`${API_ENDPOINTS.PRODUCTS}/won`, {
                headers: {
                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch(async (error) => {
                console.log(error);
                if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN") {
                    await dispatch("AuthModule/doRefresh", null, { root: true });
                    return await axios
                        .get(`${API_ENDPOINTS.PRODUCTS}/won`, {
                            headers: {
                                Authorization: "Bearer " + rootState.AuthModule.accessToken,
                            },
                        })
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            console.log(error);
                            return [];
                        });
                }
            });

        let rates = await axios
            .get(`${API_ENDPOINTS.USERS}/rate`, {
                headers: {
                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                },
            })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error);
                return [];
            });

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
            commit("setCompletedBidsItems", data);
            commit("setCompletedBidsLoadingState", false);
        }, 500);
    },

    leaveReviewCompleted({ commit }, { id, rating, comment }) {
        commit("setCompletedBidsLoadingState", true);
        setTimeout(() => {
            commit("setCompletedBidReview", { id, rating, comment });
            commit("setCompletedBidsLoadingState", false);
            showSnack(`Review submitted for bid id: ${id}`);
        }, 250);
    },
};
