import { showSnack } from "@/utils/showSnack";
import { API_ENDPOINTS, IMAGE_API_ENDPOINT } from "@/utils/constants";
import axios from "axios";

export default {
    async fetchAll({ commit, dispatch }) {
        commit("setLoadingState", true);

        const data = [];

        let products = await axios
            .get(`${API_ENDPOINTS.PRODUCTS}`)
            .then((response) => {
                return response.data;
            })
            .catch(async (error) => {
                console.log(error.response.data);
                if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN") {
                    await dispatch("AuthModule/doRefresh", null, { root: true });
                    return await axios
                        .get(`${API_ENDPOINTS.PRODUCTS}`)
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            console.log(error.response.data);
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
            commit("setItems", data);
            commit("setLoadingState", false);
        }, 500);
    },

    async removeItem({ commit, rootState, dispatch }, id) {
        commit("setLoadingState", true);

        let check = await axios
            .delete(`${API_ENDPOINTS.PRODUCTS}/${id}`, {
                headers: {
                    Authorization: "Bearer " + rootState.AuthModule.accessToken,
                },
            })
            .then(() => {
                return true;
            })
            .catch(async (error) => {
                console.log(error.response.data);
                if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN") {
                    await dispatch("AuthModule/doRefresh", null, { root: true });
                    return await axios
                        .delete(`${API_ENDPOINTS.PRODUCTS}/${id}`, {
                            headers: {
                                Authorization: "Bearer " + rootState.AuthModule.accessToken,
                            },
                        })
                        .then((response) => {
                            return response.data;
                        })
                        .catch((error) => {
                            console.log(error.response.data);
                            return [];
                        });
                }
            });

        if (check !== true) {
            showSnack(`Can't Removed item ${id}`);
            commit("setLoadingState", false);
            return;
        }

        setTimeout(() => {
            commit("removeItem", id);
            commit("setLoadingState", false);
            showSnack(`Removed item ${id}`);
        }, 250);
    },
};
