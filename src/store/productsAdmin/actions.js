import { showSnack } from "@/utils/showSnack";
import { API_ENDPOINTS, IMAGE_API_ENDPOINT } from "@/utils/constants";
import axios from "axios";
import { getAllProducts } from "@/api/productsAdmin";

export default {
    async fetchAll({ commit}) {
        commit("setLoadingState", true);

        const data = [];

        // let products = await axios
        //     .get(`${API_ENDPOINTS.PRODUCTS}`)
        //     .then((response) => {
        //         return response.data;
        //     })
        //     .catch(async (error) => {
        //         console.log(error);
        //         if (error.response.data && error.response.data.title === "EXPIRED_ACCESSTOKEN") {
        //             await dispatch("AuthModule/doRefresh", null, { root: true });
        //             return await axios
        //                 .get(`${API_ENDPOINTS.PRODUCTS}`)
        //                 .then((response) => {
        //                     return response.data;
        //                 })
        //                 .catch((error) => {
        //                     console.log(error);
        //                     return [];
        //                 });
        //         }
        //     });

        let products = await getAllProducts();

        products?.forEach((product) => {
            data.push({
                primaryImage: `${IMAGE_API_ENDPOINT}/${product.avatar}`,
                id: product.product_id,
                name: product.name,
                endTime: product.end_at,
                highestBidPrice: product.current_price,
                isSold: product.is_sold === 1 ? true : false,
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
                console.log(error);
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
                            console.log(error);
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
