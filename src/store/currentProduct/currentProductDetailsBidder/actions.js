import { buyProductNow, placeBids, sendBidRequest, turnOffAutoBid, turnOnAutoBid } from "@/api/bid";
import { showSnack } from "@/utils/showSnack";
import { BID_AVAILABILITY } from "@/utils/constants";
import { getBiddingPermisson } from "@/api/bid";
import { checkBidRequest } from "@/api/bid";

export default {
    getAllInfo({ dispatch }) {
        dispatch("getWatchlistStatus");
        dispatch("getBidAvailability");
    },

    async getWatchlistStatus({ commit, rootState }) {
        // Dispatch a getWatchlist call (just in case)
        // dispatch("BidderWatchlistModule/getItems", null, { root: true });
        // Filter from watchlistItems
        const isOnWatchlist =
            find(rootState.BidderWatchlistModule.items, { id: rootState.CurrentProductInfoModule.id }) !== undefined;
        commit("setIsOnWatchlist", isOnWatchlist);
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

    async addManualBid({ commit }, { product_id, bid_price }) {
        let result = await placeBids(product_id, bid_price);
        if (result) {
            showSnack("You have place your bidding");
            // TODO call mutation on ProductDetailsModule: add this bidder name
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

    async buyProduct({ commit }, { product_id }) {
        let result = await buyProductNow(product_id);
        if (result) {
            showSnack("You have bought this product");
            // TODO call mutataion on ProductDetailsModule: add this bidder name, then set isSold to true
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
