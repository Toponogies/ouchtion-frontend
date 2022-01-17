<template>
    <v-card :loading="isLoading">
        <template slot="progress">
            <v-progress-linear indeterminate></v-progress-linear>
        </template>
        <div class="pa-4">
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
    computed: {
        isLoading() {
            return !this.products || this.products.length === 0;
        },
    },
};
</script>
