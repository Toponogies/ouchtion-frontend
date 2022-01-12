import { generateMockProduct } from "@/utils/mockUtils";

export default {
    fetchAll({ commit }) {
        let productsEndingSoon = generateMockProduct(8);
        commit("updateProductsEndingSoon", productsEndingSoon);

        let productsMostBidders = generateMockProduct(8);
        commit("updateProductsMostBidders", productsMostBidders);

        let productsHighestPrice = generateMockProduct(8);
        commit("updateProductsHighestPrice", productsHighestPrice);
    },
};
