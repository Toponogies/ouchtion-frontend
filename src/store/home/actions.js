import { generateMockProduct } from "@/utils/mockUtils";
import { HOME_FEATURED_PRODUCTS_LIMIT } from "@/utils/constants";

export default {
    fetchAll({ commit }) {
        let productsEndingSoon = generateMockProduct(HOME_FEATURED_PRODUCTS_LIMIT);
        commit("updateProductsEndingSoon", productsEndingSoon);

        let productsMostBidders = generateMockProduct(HOME_FEATURED_PRODUCTS_LIMIT);
        commit("updateProductsMostBidders", productsMostBidders);

        let productsHighestPrice = generateMockProduct(HOME_FEATURED_PRODUCTS_LIMIT);
        commit("updateProductsHighestPrice", productsHighestPrice);
    },
};
