<template>
    <v-container class="ma-0 pa-0">
        <v-card class="pa-4 mb-4">
            <product-image-gallery :productId="id"></product-image-gallery>
        </v-card>
        <v-card class="pa-0 mb-4">
            <v-row no-gutters class="px-6 pt-6 pb-3">
                <v-col>
                    <div class="text-h4 font-weight-light">Samsung Galaxy S21 Ultra 5G</div>
                </v-col>
                <username-card class="mx-4" :username="'user1'" :rating="4.8"></username-card>
                <v-btn icon @click="toggleWatchState">
                    <v-icon v-if="local_isOnWatchlist === false">mdi-bookmark-outline</v-icon>
                    <v-icon v-else>mdi-bookmark</v-icon>
                </v-btn>
            </v-row>
            <v-row no-gutters class="px-6 pt-3">
                <v-col class="mr-2">
                    <bid-action-card></bid-action-card>
                </v-col>
                <v-col class="ml-2">
                    <buy-now-action-card :price="buyNowPrice"></buy-now-action-card>
                </v-col>
            </v-row>
            <v-row no-gutters class="px-6 py-6">
                <v-col>
                    <div class="d-flex flex-align-center">
                        <v-icon left small>mdi-clock</v-icon>
                        <span>Posted at 31/12/2021 00:00:00</span>
                    </div>
                    <div class="d-flex flex-align-center">
                        <v-icon left small>mdi-clock-outline</v-icon>
                        <span>Ends at 31/12/2021 00:00:00</span>
                    </div>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row no-gutters class="pa-6">
                <v-col>
                    <product-description></product-description>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row no-gutters class="pa-6">
                <v-col>
                    <bidder-list></bidder-list>
                </v-col>
            </v-row>
        </v-card>
        <featured-product-group :title="'Related products'"></featured-product-group>
    </v-container>
</template>

<script>
import ProductImageGallery from "@/components/productDetails/ProductImageGallery";
import UsernameCard from "@/components/productDetails/UsernameCard";
import BidderList from "@/components/productDetails/BidderList";
import ProductDescription from "@/components/productDetails/ProductDescription";

import BidActionCard from "@/components/productActions/BidActionCard";
import BuyNowActionCard from "@/components/productActions/BuyNowActionCard";

import FeaturedProductGroup from "@/components/productListings/FeaturedProductGroup";

export default {
    name: "ProductDetails",
    components: {
        ProductImageGallery,
        FeaturedProductGroup,
        UsernameCard,
        BidderList,
        ProductDescription,
        BidActionCard,
        BuyNowActionCard,
    },
    data() {
        return {
            id: this.$route.params.id,
            buyNowPrice: 1699000,
        };
    },

    // Fetch product info from id
};
</script>
