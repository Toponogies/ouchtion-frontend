export default {
    setLoading(state, loading) {
        state.isLoading = loading;
    },

    setProductId(state, id) {
        state.id = id;
    },

    setProductInfo(state, payload) {
        state.title = payload.name;
        state.categoryId = payload.category_id;
        state.seller.id = payload.seller_id;
        state.startTime = payload.start_at;
        state.endTime = payload.end_at;
        state.bid.highestUser.id = payload.buyer_id;
        state.bid.highestPrice = payload.current_price;
        state.bid.priceIncrement = payload.step_price;
        state.buyNow.price = payload.buy_price;
        state.isSold = payload.is_sold;
    },

    setCategories(state, categories) {
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

    setRelatedProducts(state, products) {
        state.relatedProducts = products;
    },

    setProductAsSold(state) {
        state.isSold = true;
    },
};
