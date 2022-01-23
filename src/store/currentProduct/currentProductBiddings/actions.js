import { getProductBidding } from "@/api/product";
import { toLongTimestamp } from "@/utils/timeUtils";
import { censorName } from "@/utils/censorName";

export default {
    async getItems({ commit, rootState }) {
        commit("setLoading", true);

        // Biddings
        let productBiddings = await getProductBidding(rootState.CurrentProductInfoModule.id);

        if (productBiddings) {
            // Expand timestamp, then censor names
            productBiddings = productBiddings.map((each) => ({
                ...each,
                time: toLongTimestamp(each.time),
                full_name: censorName(each.full_name),
            }));
            commit("setItems", productBiddings);

            // Bidders: check if current bidder has enabled auto-bidding for current product
            let isAutoBidEnabled = false;
            productBiddings.forEach((bidding) => {
                if (
                    bidding.user_id === rootState.CurrentUserModule.id &&
                    bidding.max_price !== null &&
                    bidding.is_auto_process === 1
                )
                    isAutoBidEnabled = true;
            });
            commit("CurrentProductDetailsBidder/setAutoBidState", isAutoBidEnabled, { root: true });
        } else {
            console.log(`Failed to get biddings for product id = ${rootState.CurrentProductInfoModule.id}`);
        }

        commit("setLoading", false);
    },
};
