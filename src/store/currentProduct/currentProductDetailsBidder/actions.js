import { buyProductNow, placeBids, sendBidRequest, turnOffAutoBid, turnOnAutoBid } from "@/api/bid";
import { showSnack } from "@/utils/showSnack";
import { BID_AVAILABILITY } from "@/utils/constants";
import { getBiddingPermisson } from "@/api/bid";
import { checkBidRequest } from "@/api/bid";
import { today } from "@/utils/timeUtils";

export default {
    async getAllInfo({ dispatch }) {
        await dispatch("getBidAvailability");
    },

    async getBidAvailability({ commit, rootState }) {
        // The product is already sold
        let isSold = rootState.CurrentProductInfoModule.isSold;
        if (isSold) {
            commit("setBidAvailability", BID_AVAILABILITY.IS_SOLD);
            return;
        }

        // The bidder can bid normally
        let canBid = await getBiddingPermisson(rootState.CurrentProductInfoModule.id);
        if (canBid) {
            commit("setBidAvailability", BID_AVAILABILITY.CAN_BID);
            return;
        }

        // The bidder cannot bid directly, and...
        let existingBidRequest = await checkBidRequest(rootState.CurrentProductInfoModule.id);

        // They haven't sent a request to the seller. They can send one.
        if (existingBidRequest.length === 0) {
            commit("setBidAvailability", BID_AVAILABILITY.REQUEST_REQUIRED);
            return;
        }

        // They have already sent a request, but...
        if (!existingBidRequest[0].is_processed) {
            commit("setBidAvailability", BID_AVAILABILITY.REQUEST_PENDING);
            return;
        }

        // It's rejected.
        if (existingBidRequest[0].type === "DENY") {
            commit("setBidAvailability", BID_AVAILABILITY.REQUEST_FAILED);
            return;
        }
    },

    async addManualBid({ commit, rootState }, { product_id, bid_price }) {
        let result = await placeBids(product_id, bid_price);
        console.log(result);
        if (result) {
            let bid = {
                time: today(),
                full_name: rootState.CurrentUserModule.username,
                bid_price,
            };
            console.log(bid);
            commit("CurrentProductBiddingsModule/addItem", bid, { root: true });

            showSnack("You have placed your bidding");
        } else {
            showSnack(`Failed to place bidding on product id = ${product_id}`);
        }
    },

    async sendBidRequest({ commit, state }) {
        const result = await sendBidRequest(state.id);
        if (result) {
            commit("setBidAvailability", {
                isBlockedFromBidding: true,
                requestSent: true,
                isBlockedFromRequesting: false,
            });
            showSnack("Bid request sent to the seller.");
        } else {
            showSnack("Failed to send bid request");
        }
    },

    async buyProduct({ commit, rootState }, { product_id }) {
        let result = await buyProductNow(product_id);
        if (result) {
            let purchase = {
                time: today(),
                full_name: rootState.CurrentUserModule.username,
                bid_price: rootState.CurrentProductInfoModule.buyNow.price,
            };
            commit("CurrentProductBiddingsModule/addItem", purchase, { root: true });
            commit("CurrentProductInfoModule/setProductAsSold", null, { root: true });

            showSnack("You have bought this product");
        } else {
            showSnack("Failed to buy this product");
        }
    },

    async turnOnAutoBidding({ commit }, { product_id, max_price }) {
        let result = await turnOnAutoBid(product_id, max_price);
        if (result) {
            commit("setIsAutoBidState", true);
            showSnack("You have turned on auto-bidding");
        } else {
            showSnack("Failed to turn on auto-bidding");
        }
    },

    async turnOffAutoBidding({ commit }, { product_id }) {
        let result = await turnOffAutoBid(product_id);
        if (result) {
            commit("setIsAutoBidState", false);
            showSnack("You have turned off auto-bidding");
        } else {
            showSnack("Failed to turn off auto-bidding");
        }
    },
};
