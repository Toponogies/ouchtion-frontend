export default {
    setProductId(state, { id }) {
        state.id = id;
    },

    setProductInfo(state, payload) {
        state.title = payload.name;
        state.startTime = payload.start_at;
        state.endTime = payload.end_at;

        state.bid.highestPrice = payload.current_price;
        state.bid.priceIncrement = payload.step_price;
        state.buyNow.price = payload.buy_price;

        state.isBlockedFromBidding = payload.is_sold;
        state.isOnWatchlist = payload.isOnWatchlist;
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

    setProductDescriptions(state, descriptions) {
        state.descriptions = descriptions;
    },

    setProductImages(state, payload) {
        state.primaryImage = payload.avatar;
    },

    setProductBiddings(state, payload) {},

    setRelatedProducts(state, products) {
        state.relatedProducts = products;
    },
};
