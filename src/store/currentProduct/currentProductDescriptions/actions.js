import { getProductDescription } from "@/api/product";
import { find } from "lodash-es";

export default {
    async getItems({ commit, rootState }) {
        commit("isLoading", true);

        let productDescriptions = await getProductDescription(rootState.CurrentProductInfoModule.id);
        if (productDescriptions) {
            // Mark the first description as primary
            productDescriptions = productDescriptions.map((each, index) => ({ ...each, isInit: index === 0 }));
            // Split into primary and secondary
            let primaryDescription = find(productDescriptions, { isInit: true });
            let secondaryDescriptions = productDescriptions.filter((each) => each.isInit === false);
            commit("setPrimary", primaryDescription);
            commit("setSecondary", secondaryDescriptions);
        } else {
            console.log(`Failed to fetch descriptions for product id = ${rootState.CurrentProductInfoModule.id}`);
        }

        commit("isLoading", false);
    },
};
