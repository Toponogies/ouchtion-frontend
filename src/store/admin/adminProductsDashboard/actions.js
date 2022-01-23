import { removeProduct } from "@/api/product";
import { getAllProducts } from "@/api/productsAdmin";
import { IMAGE_API_ENDPOINT } from "@/utils/constants";
import { showSnack } from "@/utils/showSnack";

export default {
    async getItems({ commit }) {
        commit("setLoading", true);

        let products = await getAllProducts();
        if (products) {
            products = products.map((product) => ({
                primaryImage: `${IMAGE_API_ENDPOINT}/${product.avatar}`,
                id: product.product_id,
                name: product.name,
                endTime: product.end_at,
                highestBidPrice: product.current_price,
                isSold: product.is_sold === 1 ? true : false,
            }));
            commit("setItems", products);
        } else {
            showSnack(`Failed to get product list`);
        }

        commit("setLoading", false);
    },

    async remove({ commit }, id) {
        commit("setLoading", true);

        let result = await removeProduct(id);
        if (result) {
            showSnack(`Failed to remove item id = ${id}`);
        } else {
            commit("remove", id);
            showSnack(`Removed item id = ${id}`);
        }

        commit("setLoading", false);
    },
};
