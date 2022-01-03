<template>
    <v-container class="ma-0 pa-0">
        <featured-product-group
            class="mb-6"
            :title="'Ending soon'"
            :products="productsEndingSoon"
            highlightEndTime
        ></featured-product-group>
        <featured-product-group
            class="mb-6"
            :title="'Most bidders'"
            :products="productsMostBidders"
        ></featured-product-group>
        <featured-product-group :title="'Highest price'" :products="productsHighestPrice"></featured-product-group>
    </v-container>
</template>

<script>
import FeaturedProductGroup from "@/components/productListings/FeaturedProductGroup";
import { HOME_FEATURED_PRODUCTS_LIMIT } from "@/utils/constants";
import { generateMockProduct } from "@/utils/mockUtils";

export default {
    name: "Home",
    components: { FeaturedProductGroup },
    data() {
        return {
            productsEndingSoon: [],
            productsMostBidders: [],
            productsHighestPrice: [],
        };
    },
    methods: {
        fetchFeaturedEndingSoon() {
            this.productsEndingSoon = generateMockProduct(HOME_FEATURED_PRODUCTS_LIMIT);
        },
        fetchFeaturedMostBidders() {
            this.productsMostBidders = generateMockProduct(HOME_FEATURED_PRODUCTS_LIMIT);
        },
        fetchFeaturedHighestPrice() {
            this.productsHighestPrice = generateMockProduct(HOME_FEATURED_PRODUCTS_LIMIT);
        },
    },
    mounted() {
        this.fetchFeaturedEndingSoon();
        this.fetchFeaturedMostBidders();
        this.fetchFeaturedHighestPrice();
    },
};
</script>
