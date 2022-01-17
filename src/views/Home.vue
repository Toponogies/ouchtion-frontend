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
};
</script>
