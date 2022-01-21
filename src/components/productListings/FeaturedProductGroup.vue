<template>
    <v-card>
        <div class="pa-4">
            <div class="text-h5 font-weight-bold pa-2">{{ title }}</div>
            <v-row no-gutters>
                <!-- Placeholder (no products) -->
                <v-col class="pa-2" v-if="!products || products.length === 0">
                    <v-row no-gutters justify="center" align="center" class="d-flex flex-column">
                        <v-icon large color="grey" class="mb-1">mdi-package-variant-closed</v-icon>
                        <div class="grey--text mt-1">No products</div>
                    </v-row>
                </v-col>

                <!-- Product cards -->
                <v-col xs="6" sm="4" md="3" class="pa-2" v-for="product in products" :key="product.id">
                    <product-card-small
                        :id="product.id"
                        :title="product.title"
                        :image="product.image"
                        :bidderCount="product.bidderCount"
                        :bidHighestPrice="product.bidHighestPrice"
                        :endTime="product.endTime"
                        :highlightEndTime="highlightEndTime"
                    ></product-card-small>
                </v-col>
            </v-row>
        </div>
    </v-card>
</template>

<script>
import ProductCardSmall from "@/components/productListings/ProductCardSmall";

export default {
    name: "FeaturedProductGroup",
    props: {
        title: String,
        products: Array,
        highlightEndTime: Boolean,
    },
    components: { ProductCardSmall },
};
</script>
