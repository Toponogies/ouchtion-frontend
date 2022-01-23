import { getProductImage } from "@/api/product";
import { IMAGE_API_ENDPOINT } from "@/utils/constants";

export default {
    async getItems({ commit, rootState }) {
        commit("setLoading", true);

        let images = await getProductImage(rootState.CurrentProductInfoModule.id);

        if (images) {
            // Turn relative paths to absolute paths
            images = images.map((each) => ({
                ...each,
                path: `${IMAGE_API_ENDPOINT}/${each.path}`,
            }));
            commit("setProductImages", images);
        } else {
            console.log(`Failed to get images for product id = ${rootState.CurrentProductInfoModule.id}`);
        }

        commit("setLoading", false);
    },
};
