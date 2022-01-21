import { getProduct } from "@/api/product";
import { deleteWatchList, getWatchList } from "@/api/watchlist";
import { IMAGE_API_ENDPOINT } from "@/utils/constants";
import { showSnack } from "@/utils/showSnack";

export default {
    async fetchAll({ commit, rootState }) {
        commit("setLoadingState", true);

        const data = [];

        try {
            let products = await getWatchList(rootState.AuthModule.accessToken)

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


        setTimeout(() => {
            commit("setItems", data);
            commit("setLoadingState", false);
        }, 500);
    },

    async removeItem({ commit, rootState }, id) {
        commit("setLoadingState", true);

        try{
            await deleteWatchList(rootState.AuthModule.accessToken,id);
            setTimeout(() => {
                commit("removeItem", id);
                commit("setLoadingState", false);
                showSnack(`Removed item ${id}`);
            }, 250);
        }catch(error){
            setTimeout(() => {
                commit("setLoadingState", false);
                showSnack(`Can't removed item ${id}`);
            }, 250);
        }
    },
};
