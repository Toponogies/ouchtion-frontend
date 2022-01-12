export default {
    updateProductsEndingSoon(state, newProducts) {
        state.productsEndingSoon = newProducts;
    },
    updateProductsMostBidders(state, newProducts) {
        state.productsMostBidders = newProducts;
    },
    updateProductsHighestPrice(state, newProducts) {
        state.productsHighestPrice = newProducts;
    },
};
