import { getProduct } from "@/api/product";
import { addToWatchlist, getWatchList, removeFromWatchlist } from "@/api/watchlist";
import { IMAGE_API_ENDPOINT } from "@/utils/constants";
import { showSnack } from "@/utils/showSnack";

export default {
    async getItems({ commit }) {
        commit("setLoading", true);

        let productIds = await getWatchList();

        if (productIds) {
            productIds = productIds.map((each) => each.product_id);

            let products = [];
            productIds.forEach(async (id) => {
                let product = await getProduct(id);
                console.log(product);
                products.push({
                    id,
                    primaryImage: `${IMAGE_API_ENDPOINT}/${product.avatar}`,
                    name: product.name,
                    endTime: product.end_at,
                    highestBidPrice: product.current_price,
                });
            });
            commit("setItems", products);
        } else {
            showSnack(`Failed to get watchlist`);
        }

        commit("setLoading", false);
    },

    async add({ commit }, id) {
        commit("setLoading", true);

        let result = await addToWatchlist(id);

        if (result) {
            let item = {
                id,
                primaryImage: "",
                name: "",
                endTime: "",
                highestBidPrice: "",
            };
            let product = await getProduct(id);
            if (product) {
                item = {
                    ...item,
                    primaryImage: `${IMAGE_API_ENDPOINT}/${product.avatar}`,
                    name: product.name,
                    endTime: product.end_at,
                    highestBidPrice: product.current_price,
                };
            }

            commit("addItem", item);
            showSnack(`Added item id = ${id} to watchlist`);
        } else {
            showSnack(`Failed to add item id = ${id} to watchlist`);
        }

        commit("setLoading", false);
    },

    async remove({ commit }, id) {
        commit("setLoading", true);

        let result = await removeFromWatchlist(id);

        if (result) {
            commit("remove", id);
            showSnack(`Removed item ${id} from watchlist`);
        } else {
            showSnack(`Failed to remove item id = ${id} from watchlist`);
        }

        commit("setLoading", false);
    },
};
