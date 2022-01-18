import { showSnack } from "@/utils/showSnack";
import axios from "axios";

export default {
    async fetchOngoing({ commit,rootState,dispatch }) {
        commit("setOngoingProductsLoadingState", true);
        const data = [];

        let products = await axios.get("http://localhost:3000/api/products/active", {headers: {
                'Authorization': 'Bearer '+ rootState.AuthModule.accessToken,
            }}).then((response) => {
                    return response.data;
            }).catch( async (error) => {
                console.log(error.response.data);
                if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN")
                {
                    await dispatch('AuthModule/doRefresh', null, { root: true });
                }
                return await axios.get("http://localhost:3000/api/products/active",{headers: {
                    'Authorization': 'Bearer '+ rootState.AuthModule.accessToken,
                }}).then((response) => {
                    return response.data;
                })
                .catch((error) => {
                   console.log(error.response.data)
                   return [];
                });
            });
        products.forEach(product => {
            data.push({
                primaryImage: "http://localhost:3000/"+ product.avatar,
                id: product.product_id,
                name: product.name,
                endTime: product.end_at,
                highestBidPrice: product.current_price,
            })
        });

        setTimeout(() => {
            commit("setOngoingProductsItems", data);
            commit("setOngoingProductsLoadingState", false);
        }, 500);
    },

    async fetchCompleted({ commit,dispatch,rootState }) {
        commit("setCompletedProductsLoadingState", true);
        const data = [];

        let products = await axios.get("http://localhost:3000/api/products/inactive", {headers: {
                'Authorization': 'Bearer '+ rootState.AuthModule.accessToken,
        }}).then((response) => {
                return response.data;
        }).catch( async (error) => {
            console.log(error.response.data);
            if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN")
            {
                await dispatch('AuthModule/doRefresh', null, { root: true });
            }
            return await axios.get("http://localhost:3000/api/products/inactive",{headers: {
                'Authorization': 'Bearer '+ rootState.AuthModule.accessToken,
            }}).then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.log(error.response.data)
                return [];
            });
        });

        let rates = await axios.get(`http://localhost:3000/api/users/rate`, {headers: {
                'Authorization': 'Bearer '+ rootState.AuthModule.accessToken,
        }}).then((response) => {
            return response.data;
        })

        products.forEach(async product => {
            let reviewToBidder = {
                rating: null,
                comment: null,
            }

            let reviewToSeller = {
                rating: null,
                comment: null,
            }

            rates.forEach(rate => {
                if (rate.type === "SELLER-BUYER" && rate.product_id === product.product_id)
                {
                    reviewToBidder = {
                        rating: rate.rate,
                        comment: rate.comment,
                    }
                }
                if (rate.type === "BUYER-SELLER" && rate.product_id === product.product_id)
                {
                    reviewToSeller = {
                        rating: rate.rate,
                        comment: rate.comment,
                    }
                }
            });
            data.push({
                primaryImage: "http://localhost:3000/"+ product.avatar,
                id: product.product_id,
                name: product.name,
                highestBidPrice: product.current_price,

                // seller -> bidder, read-only
                reviewToBidder: reviewToBidder,

                // bidder -> seller, can only write once
                reviewToSeller: reviewToSeller,
            })
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
