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
import { mapState, mapActions } from "vuex";
import { socket } from "@/socket/connect";
import { BIDDING_BUY, PRODUCT_ADD, PRODUCT_DELETE, PRODUCT_WON } from "@/utils/constants";

export default {
    name: "Home",
    components: { FeaturedProductGroup },
    computed: {
        ...mapState("HomeModule", ["productsEndingSoon", "productsMostBidders", "productsHighestPrice"]),
    },
    methods: {
        ...mapActions("HomeModule", ["fetchAll"]),
    },
    mounted() {
        this.fetchAll();
    },
    created() {
        socket.on(PRODUCT_DELETE, () => {
            // Get all products again and update the list
            this.fetchAll();
        });

        socket.on(PRODUCT_ADD, () => {
            // Get all products again and update the list
            this.fetchAll();
        });

        socket.on(PRODUCT_WON, () => {
            // Get all products and update the list
            this.fetchAll();
        });
    },
};
</script>
