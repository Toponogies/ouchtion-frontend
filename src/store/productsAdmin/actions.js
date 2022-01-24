import { showSnack } from "@/utils/showSnack";
import { IMAGE_API_ENDPOINT } from "@/utils/constants";
import { getAllProducts } from "@/api/productsAdmin";
import { removeProduct } from "@/api/product";

export default {
    async fetchAll({ commit }) {
        commit("setLoadingState", true);

        const data = [];

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
        commit("setItems", data);
        commit("setLoadingState", false);
    },

    async removeItem({ commit }, id) {
        commit("setLoadingState", true);

        let check = await removeProduct(id);

        if (check !== true) {
            showSnack(`Can't Removed item ${id}`);
            commit("setLoadingState", false);
            return;
        }

        commit("removeItem", id);
        commit("setLoadingState", false);
        showSnack(`Removed item ${id}`);
    },
};
