import { getUserWithPoint } from "@/api/user";
import { getProduct, getProductDescription, getProductImage, getProductBidding, getProductRelate } from "@/api/product";
import { getCategory } from "@/api/category";
import { addToWatchlist, getWatchList, removeFromWatchlist } from "@/api/watchlist";
import {
    getBiddingPermisson,
    checkBidRequest,
    sendBidRequest,
    getAllBidRequests,
    acceptBidRequest,
    rejectBidRequest,
    blockBidder,
} from "@/api/bid";

import { find } from "lodash-es";
import { today, toLongTimestamp } from "@/utils/timeUtils";
import { hiddenName } from "@/utils/hiddenName";
import { BID_AVAILABILITY, IMAGE_API_ENDPOINT, ROLES } from "@/utils/constants";
import { showSnack } from "@/utils/showSnack";
import { appendDescription } from "@/api/productDescription";
import { buyProductNow, placeBids, turnOffAutoBid, turnOnAutoBid } from "@/api/bid";

export default {
    setProductId({ commit }, id) {
        commit("setProductId", parseInt(id));
    },

    async fetchAllDetails({ commit, dispatch, state }) {
        // Basic info
        let productInfo = {};
        try {
            productInfo = await getProduct(state.id);
            commit("setProductInfo", productInfo);
        } catch (error) {
            console.log(error.response);
            console.log(`Fetching product info failed: ${error}`);
        }

        // Categories
        try {
            const categoryOfProduct = await getCategory(productInfo.category_id);
            commit("setCategoriesOfProduct", [categoryOfProduct]);
        } catch (error) {
            console.log(`Fetching categories of this product failed: ${error}`);
        }

        // Seller username/rating
        try {
            const sellerInfo = await getUserWithPoint(productInfo.seller_id);
            commit("setSellerInfo", sellerInfo);
        } catch (error) {
            console.log(`Fetching seller info failed: ${error}`);
        }

        // Highest bidder username/rating
        try {
            const highestBidderInfo = await getUserWithPoint(productInfo.buyer_id);
            commit("setHighestBidderInfo", highestBidderInfo);
        } catch (error) {
            console.log(`Fetching highest bidder info failed: ${error}`);
        }

        // Descriptions
        try {
            let productDescriptions = await getProductDescription(state.id);
            // Mark the first description as primary
            productDescriptions = productDescriptions.map((each, index) => ({ ...each, isInit: index === 0 }));
            // Split into primary and secondary
            let primaryDescription = find(productDescriptions, { isInit: true });
            let secondaryDescriptions = productDescriptions.filter((each) => each.isInit === false);
            commit("setProductDescriptions", { primaryDescription, secondaryDescriptions });
        } catch (error) {
            console.log(`Fetching product descriptions failed: ${error}`);
        }

        // Images
        try {
            let productImages = await getProductImage(state.id);
            // Turn relative paths to absolute paths
            productImages = productImages.map((each) => ({
                ...each,
                path: `${IMAGE_API_ENDPOINT}/${each.path}`,
            }));
            // Split into primary and secondary group
            let primaryImage = productImages[0];
            let secondaryImages = productImages.filter((_, index) => index !== 0);
            commit("setProductImages", { primaryImage, secondaryImages });
        } catch (error) {
            console.log(`Fetching product images failed: ${error}`);
        }

        // Biddings
        dispatch("getBiddings");

        // Related products
        try {
            const relatedProducts = await getProductRelate(productInfo.category_id);
            let data = [];
            relatedProducts?.forEach(async (product) => {
                let user = await getUserWithPoint(product.buyer_id);
                // Remove current product from filtered list to prevent duplicates
                if (product.product_id !== state.id) {
                    data.push({
                        id: product.product_id,
                        title: product.name,
                        image: `${IMAGE_API_ENDPOINT}/${product.avatar}`,
                        bidderCount: product.bidding_count,
                        bidHighestPrice: product.current_price,
                        bidHighestUser: user.full_name,
                        buyNowPrice: product.buy_price,
                        startTime: product.start_at,
                        endTime: product.end_at,
                        isOnWatchlist: false,
                    });
                }
            });
            commit("setRelatedProducts", data);
        } catch (error) {
            console.log(`Fetching related products failed: ${error}`);
        }

        // Is the current product in user's watchlist?
        // Dispatch a getWatchlist call (just in case)
        let watchlist = await getWatchList();
        // Filter from watchlistItems
        const isOnWatchlist = find(watchlist, { product_id: state.id }) !== undefined;
        commit("setIsOnWatchlist", isOnWatchlist);

        // Bidders: can they bid on this product?
        dispatch("setBidAvailability");
    },

    async getBiddings({ commit, state, rootState }) {
        // Biddings
        try {
            let productBiddings = await getProductBidding(state.id);
            // Expand timestamp, then censor names
            productBiddings = productBiddings.map((each) => ({
                ...each,
                time: toLongTimestamp(each.time),
                full_name: hiddenName(each.full_name),
            }));

            let isAutoBidEnabled = false;

            productBiddings.forEach((bidding) => {
                if (
                    bidding.user_id === rootState.CurrentUserModule.id &&
                    bidding.max_price !== null &&
                    bidding.is_auto_process === 1
                )
                    isAutoBidEnabled = true;
            });
            commit("setProductBiddings", productBiddings);
            commit("setIsAutoBidState", isAutoBidEnabled);
        } catch (error) {
            console.log(`Fetching product biddings failed: ${error}`);
        }
    },

    async setBidAvailability({ commit, state, rootState }) {
        // Everyone else who's not a bidder: you don't need to check for this.
        if (rootState.CurrentUserModule.role !== ROLES.BIDDER) {
            return;
        }

        // Is the product sold?
        if (state.isSold) {
            commit("setBidAvailability", BID_AVAILABILITY.IS_SOLD);
            return;
        }

        // Can the bidder bid directly on this product?
        let canBid = await getBiddingPermisson(state.id);
        switch (canBid) {
            case BID_AVAILABILITY.CAN_BID:
                commit("setBidAvailability", BID_AVAILABILITY.CAN_BID);
                return;
            case BID_AVAILABILITY.REQUEST_REQUIRED:
                commit("setBidAvailability", BID_AVAILABILITY.REQUEST_REQUIRED);
                return;
            case BID_AVAILABILITY.REQUEST_FAILED:
                commit("setBidAvailability", BID_AVAILABILITY.REQUEST_FAILED);
                return;
            default:
                break;
        }

        // The bidder cannot bid directly. Did they send a request to the seller?
        let existingBidRequest = await checkBidRequest(state.id);

        // They haven't sent a request to the seller. They can send one.
        if (existingBidRequest.length === 0) {
            commit("setBidAvailability", BID_AVAILABILITY.REQUEST_REQUIRED);
            return;
        }

        // They have already sent a request, but...
        existingBidRequest = existingBidRequest[0];

        // It's waiting for seller's decision.
        if (!existingBidRequest.is_processed) {
            commit("setBidAvailability", BID_AVAILABILITY.REQUEST_PENDING);
            return;
        }

        // It's rejected
        if (existingBidRequest.type === "DENY") {
            commit("setBidAvailability", BID_AVAILABILITY.REQUEST_FAILED);
            return;
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

    async getBidderRequests({ commit, state, rootState }) {
        if (rootState.CurrentUserModule.id === state.seller.id) {
            const requests = await getAllBidRequests(state.id);
            if (requests) {
                let data = [];
                requests.forEach(async (request) => {
                    const { point } = await getUserWithPoint(request.user_id);
                    data.push({
                        requestId: request.request_id,
                        userId: request.user_id,
                        username: request.full_name,
                        rating: point,
                    });
                });
                commit("setBidderRequests", data);
            }
            // else {
            //     showSnack(`Failed to get bidding requests for this product.`);
            // }
        }
    },

    async acceptBidderRequest({ commit, state }, requestId) {
        // find request object corresponding to request_id
        const targetRequest = find(state.bidRequests.items, { requestId });

        const result = await acceptBidRequest(requestId, targetRequest.userId, state.id);
        if (result) {
            commit("removeBidderRequest", requestId);
            showSnack(`Accepted request id = ${requestId}`);
        } else {
            showSnack(`Failed to accept request id = ${requestId}`);
        }
    },

    async rejectBidderRequest({ commit, state }, requestId) {
        // find request object corresponding to request_id
        const targetRequest = find(state.bidRequests.items, { requestId });

        const result = await rejectBidRequest(requestId, targetRequest.userId, state.id);
        if (result) {
            commit("removeBidderRequest", requestId);
            showSnack(`Rejected request id = ${requestId}`);
        } else {
            showSnack(`Failed to reject request id = ${requestId}`);
        }
    },

    async removeAndBlockBidder({ dispatch }, bid_id) {
        console.log(`Calling block on bid id = ${bid_id}`);
        let result = await blockBidder(bid_id);

        if (result) {
            // re-fetch bidding list
            dispatch("getBiddings");
            showSnack(`Blocked bidding id = ${bid_id}.`);
        } else {
            showSnack(`Failed to block bidding id = ${bid_id}`);
        }
    },

    async addWatchlist({ commit }, id) {
        commit("setLoadingState", true);
        try {
            await addToWatchlist(id);
            commit("setIsOnWatchlist", true);
            showSnack(`Added item id = ${id} to watchlist`);
        } catch (error) {
            showSnack(`Can't add item id = ${id} to watchlist`);
        }
        commit("setLoadingState", false);
    },

    async removeWatchlist({ commit }, id) {
        commit("setLoadingState", true);
        try {
            await removeFromWatchlist(id);
            commit("setIsOnWatchlist", false);
            showSnack(`Removed item ${id}`);
        } catch (error) {
            showSnack(`Can't remove item id = ${id}`);
        }
        commit("setLoadingState", false);
    },

    async appendProductDescription({ commit }, { product_id, description }) {
        let check = await appendDescription(product_id, description);
        if (check === true) {
            showSnack("Description appended.");
            commit("appendProductDescriptions", {
                description,
                upload_date: today(),
                isInit: false,
            });
        } else {
            showSnack("Description not appended.");
        }
    },

    async addManualBid({ commit }, { product_id, bid_price }) {
        let check = await placeBids(product_id, bid_price);
        if (check === true) showSnack("Add new bid");
        else showSnack("Can't add new bidding");
    },

    async buyProduct({ commit }, { product_id }) {
        let check = await buyProductNow(product_id);
        if (check === true) showSnack("Buy product success");
        else showSnack("Can't buy this product");
    },

    async addAutoBidding({ commit }, { product_id, max_price }) {
        let check = await turnOnAutoBid(product_id, max_price);
        if (check === true) {
            commit("setIsAutoBidState", true);
            showSnack("Turn on auto bidding success");
        } else showSnack("Can't turn on auto bidding");
    },

    async turnOffAutoBidding({ commit }, { product_id }) {
        let check = await turnOffAutoBid(product_id);
        if (check === true) {
            commit("setIsAutoBidState", false);
            showSnack("Turn off auto bidding success");
        } else showSnack("Can't turn off auto bidding");
    },
};
