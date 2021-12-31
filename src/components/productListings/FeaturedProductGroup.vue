<template>
    <v-card class="pa-4">
        <div class="text-h5 font-weight-bold pa-2">{{ title }}</div>
        <v-row no-gutters>
            <v-col xs="6" sm="4" md="3" class="pa-2" v-for="product in products" :key="product.id">
                <product-card-small
                    :id="product.id"
                    :title="product.title"
                    :image="product.image"
                    :bidderCount="product.bidderCount"
                    :bidHighestPrice="product.bidHighestPrice"
                    :endTime="product.endTime"
                    highlightEndTime
                ></product-card-small>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import ProductCardSmall from "@/components/productListings/ProductCardSmall";

export default {
    name: "FeaturedProductGroup",
    props: {
        title: String,
        products: Array,
    },
    components: { ProductCardSmall },
};
</script>
