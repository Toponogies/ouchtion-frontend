export default {
    setProductsEndingSoonLoading(state, loading) {
        state.productsEndingSoonLoading = loading;
    },

    setProductsMostBiddersLoading(state, loading) {
        state.productsMostBiddersLoading = loading;
    },

    setProductHighestPriceLoading(state, loading) {
        state.productsHighestPriceLoading = loading;
    },

    updateProductsEndingSoon(state, newProducts) {
        state.productsEndingSoon = newProducts;
    },

    updateProductsMostBidders(state, newProducts) {
        state.productsMostBidders = newProducts;
    },

    updateProductsHighestPrice(state, newProducts) {
        state.productsHighestPrice = newProducts;
    },

    // eslint-disable-next-line no-unused-vars
    clearAll(state) {
        state = {
            productsEndingSoonLoading: false,
            productsMostBiddersLoading: false,
            productsHighestPriceLoading: false,
            productsEndingSoon: [],
            productsMostBidders: [],
            productsHighestPrice: [],
        };
    },
};
