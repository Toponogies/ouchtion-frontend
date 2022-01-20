import { showSnack } from "@/utils/showSnack";
import axios from "axios";

export default {
    async fetchOngoing({ commit,rootState,dispatch }) {
        commit("setOngoingBidsLoadingState", true);
        const data = [];

        let products = await axios.get("http://localhost:3000/api/products/bidders/ongoingBids", {headers: {
                'Authorization': 'Bearer '+ rootState.AuthModule.accessToken,
            }}).then((response) => {
                    return response.data;
            }).catch( async (error) => {
                console.log(error.response.data);
                if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN")
                {
                    await dispatch('AuthModule/doRefresh', null, { root: true });
                    return await axios.get("http://localhost:3000/api/products/bidders/ongoingBids",{headers: {
                        'Authorization': 'Bearer '+ rootState.AuthModule.accessToken,
                    }}).then((response) => {
                        return response.data;
                    })
                    .catch((error) => {
                       console.log(error.response.data)
                       return [];
                    });
                }
            });
        products?.forEach(product => {
            data.push({
                primaryImage: "http://localhost:3000/"+ product.avatar,
                id: product.product_id,
                name: product.name,
                endTime: product.end_at,
                highestBidPrice: product.current_price,
            })
        });
        setTimeout(() => {
            commit("setOngoingBidsItems", data);
            commit("setOngoingBidsLoadingState", false);
        }, 500);
    },

    async fetchCompleted({ commit,rootState,dispatch }) {
        commit("setCompletedBidsLoadingState", true);
        const data = [];

        let products = await axios.get("http://localhost:3000/api/products/bidders/completedBids", {headers: {
                'Authorization': 'Bearer '+ rootState.AuthModule.accessToken,
            }}).then((response) => {
                    return response.data;
            }).catch( async (error) => {
                console.log(error.response.data);
                if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN")
                {
                    await dispatch('AuthModule/doRefresh', null, { root: true });
                    return await axios.get("http://localhost:3000/api/products/bidders/completedBids",{headers: {
                        'Authorization': 'Bearer '+ rootState.AuthModule.accessToken,
                    }}).then((response) => {
                        return response.data;
                    })
                    .catch((error) => {
                       console.log(error.response.data)
                       return [];
                    });
                }
            });

        let rates = await axios.get(`http://localhost:3000/api/users/all/rate`, {headers: {
                'Authorization': 'Bearer '+ rootState.AuthModule.accessToken,
        }}).then((response) => {
            return response.data;
        }).catch((error) => {
            console.log(error.response.data)
            return [];
         });

        products?.forEach(async product => {
            let reviewToBidder = {
                rating: null,
                comment: null,
            }

            let reviewToSeller = {
                rating: null,
                comment: null,
            }

            rates?.forEach(rate => {
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
