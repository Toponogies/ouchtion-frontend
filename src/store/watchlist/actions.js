import { getProduct } from "@/api/product";
import { addToWatchlist, removeFromWatchlist, getWatchList } from "@/api/watchlist";
import { IMAGE_API_ENDPOINT } from "@/utils/constants";
import { showSnack } from "@/utils/showSnack";

export default {
    async fetchAll({ commit, rootState }) {
        commit("setLoadingState", true);

        const data = [];
        try {
            let products = await getWatchList(rootState.AuthModule.accessToken);

            products?.forEach(async (product) => {
                product = await getProduct(product.product_id);
                data.push({
                    primaryImage: `${IMAGE_API_ENDPOINT}/${product.avatar}`,
                    id: product.product_id,
                    name: product.name,
                    endTime: product.end_at,
                    highestBidPrice: product.current_price,
                });
            });
        } catch (error) {
            console.log(error.response);
        }
        commit("setItems", data);
        commit("setLoadingState", false);
    },

    async addItem({ commit, rootState }, id) {
        commit("setLoadingState", true);
        try {
            await addToWatchlist(id);
            commit("addItem", id);
            showSnack(`Added item id = ${id} to watchlist`);
        } catch (error) {
            console.log(error.response);
            showSnack(`Can't add item id = ${id} to watchlist`);
        }
        commit("setLoadingState", false);
    },

    async removeItem({ commit, rootState }, id) {
        commit("setLoadingState", true);
        try {
            await removeFromWatchlist(id);
            commit("removeItem", id);
            showSnack(`Removed item ${id}`);
        } catch (error) {
            showSnack(`Can't remove item id = ${id}`);
        }
        commit("setLoadingState", false);
    },
};
