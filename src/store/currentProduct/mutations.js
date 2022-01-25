import { findIndex } from "lodash-es";

export default {
    setProductId(state, id) {
        state.id = id;
    },

    setProductInfo(state, payload) {
        state.title = payload.name;
        state.startTime = payload.start_at;
        state.endTime = payload.end_at;

        state.bid.highestPrice = payload.current_price;
        state.bid.priceIncrement = payload.step_price;
        state.buyNow.price = payload.buy_price;
        state.seller.id = payload.seller_id;
        state.isSold = payload.is_sold;
    },

    setCategoriesOfProduct(state, categories) {
        state.categories = categories;
    },

    setSellerInfo(state, payload) {
        state.seller.username = payload.full_name;
        state.seller.rating = payload.point;
    },
    setHighestBidderInfo(state, payload) {
        state.bid.highestUser.username = payload.full_name;
        state.bid.highestUser.rating = payload.point;
    },

    setProductDescriptions(state, payload) {
        state.primaryDescription = payload.primaryDescription;
        state.secondaryDescriptions = payload.secondaryDescriptions;
    },
    appendProductDescriptions(state, payload) {
        state.secondaryDescriptions.push(payload);
    },

    setProductImages(state, payload) {
        state.primaryImage = payload.primaryImage;
        state.secondaryImages = payload.secondaryImages;
    },

    setProductBiddings(state, biddings) {
        state.bid.biddings = biddings;
    },

    setRelatedProducts(state, products) {
        state.relatedProducts = products;
    },

    setIsOnWatchlist(state, isOnWatchlist) {
        state.isOnWatchlist = isOnWatchlist;
    },

    // modal states
    setBidModalState(state, open) {
        state.bid.isModalOpen = open;
    },
    setBuyNowModalState(state, open) {
        state.buyNow.isModalOpen = open;
    },
    setAppendDescriptionModalState(state, open) {
        state.isAppendDescriptionOpen = open;
    },

    setBidRequestModalState(state, open) {
        state.request.isModalOpen = open;
    },

    // bid availability
    setBidAvailability(state, availability) {
        state.bidAvailability = availability;
    },

    // bid requests
    setBidderRequests(state, requests) {
        state.bidRequests.items = requests;
    },
    removeBidderRequest(state, requestId) {
        const targetIndex = findIndex(state.bidRequests.items, { requestId });
        state.bidRequests.items.splice(targetIndex, 1);
    },

    setIsAutoBidState(state, open) {
        state.bid.isAutoBidEnabled = open;
    },
};
