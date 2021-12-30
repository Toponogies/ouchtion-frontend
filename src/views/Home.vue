<template>
    <v-container class="ma-0 pa-0">
        <featured-product-group :title="'Featured'" :products="products"></featured-product-group>
    </v-container>
</template>

<script>
import FeaturedProductGroup from "@/components/productListings/FeaturedProductGroup";

export default {
    name: "Home",
    components: { FeaturedProductGroup },
    data() {
        return {
            singleProduct: {
                id: "product-id-0",
                title: "product-title-really-long",
                image: "https://picsum.photos/200",
                bidderCount: 68,
                bidHighestPrice: 1499000,
                bidHighestUser: "username69",
                buyNowPrice: 1699000,
                startTime: "2021-12-01 19:30:50",
                endTime: "2022-01-01 06:00:00",
                isOnWatchlist: false,
            },
            products: Array(8).fill({
                id: "product-id-0",
                title: "product-title-really-long",
                image: "https://picsum.photos/200",
                bidderCount: 68,
                bidHighestPrice: 1499000,
                bidHighestUser: "username69",
                buyNowPrice: 1699000,
                startTime: "2021-12-01 19:30:50",
                endTime: "2022-01-01 06:00:00",
                isOnWatchlist: false,
            }),
        };
    },
};
</script>
