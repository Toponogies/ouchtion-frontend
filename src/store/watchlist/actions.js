import { showSnack } from "@/utils/showSnack";
import axios from "axios";

export default {
    async fetchAll({ commit,rootState,dispatch }) {
        commit("setLoadingState", true);

        const data = [];

        let products = await axios.get("http://localhost:3000/api/products/bidders/watchlist", {
            headers: {
                Authorization: "Bearer " + rootState.AuthModule.accessToken,
            },
        }).then((response) => {
                return response.data;
        }).catch( async (error) => {
            if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN")
            {
                await dispatch('AuthModule/doRefresh', null, { root: true });
                return await axios.get("http://localhost:3000/api/products/bidders/watchlist",{headers: {
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

        products?.forEach(async product => {
            product = await axios.get(`http://localhost:3000/api/products/${product.product_id}`).then((response) => {
                return response.data;
            })
            data.push({
                primaryImage: "http://localhost:3000/"+ product.avatar,
                id: product.product_id,
                name: product.name,
                endTime: product.end_at,
                highestBidPrice: product.current_price,
            })
        });

        setTimeout(() => {
            commit("setItems", data);
            commit("setLoadingState", false);
        }, 500);
    },

    async removeItem({ commit,rootState,dispatch }, id) {
        commit("setLoadingState", true);

        await axios.delete("http://localhost:3000/api/products/bidders/watchlist", {
            headers: {
            'Authorization': 'Bearer '+ rootState.AuthModule.accessToken,
            },
            data: {
                product_id: id,
            },
        }).then((response) => {
            return response.data;
        }).catch( async (error) => {
            if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN")
            {
                await dispatch('AuthModule/doRefresh', null, { root: true });
                await axios.delete("http://localhost:3000/api/products/bidders/watchlist", {
                    headers: {
                    'Authorization': 'Bearer '+ rootState.AuthModule.accessToken,
                    },
                    data: {
                        product_id: id,
                    },
                }).then((response) => {
                    setTimeout(() => {
                        commit("removeItem", id);
                        commit("setLoadingState", false);
                        showSnack(`Removed item ${id}`);
                    }, 250);
                    return response.data;
                })
                .catch((error) => {
                    setTimeout(() => {
                        commit("setLoadingState", false);
                        showSnack(`Can't removed item ${id}`);
                    }, 250);
                    console.log(error.response.data)
                });
            }
        });

    },
};
