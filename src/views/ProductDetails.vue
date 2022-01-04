<template>
    <v-container class="ma-0 pa-0">
        <v-card class="pa-4 mb-4">
            <product-image-gallery :productId="id"></product-image-gallery>
        </v-card>
        <v-card class="pa-0 mb-4">
            <v-row no-gutters class="px-6 pt-6 pb-3">
                <v-col>
                    <div class="text-h4 font-weight-light">{{ title }}</div>
                </v-col>
                <username-card class="mx-4" :username="sellerUsername" :rating="sellerRating"></username-card>
                <v-btn icon @click="toggleWatchState">
                    <v-icon v-if="isOnWatchlist === false">mdi-bookmark-outline</v-icon>
                    <v-icon v-else>mdi-bookmark</v-icon>
                </v-btn>
            </v-row>
            <v-row no-gutters class="px-6 pt-3">
                <v-col class="mr-2">
                    <bid-action-card
                        :currentHighestBidPrice="bidHighestPrice"
                        :currentHighestBidUsername="bidHighestUser"
                        :currentHighestBidUsernameRating="bidHighestUserRating"
                        :priceIncrement="bidPriceIncrement"
                        :myUsername="myUsername"
                        :myRating="myRating"
                        :endTime="endTime"
                        :isBlockedFromBidding="isBlockedFromBidding"
                    ></bid-action-card>
                </v-col>
                <v-col class="ml-2">
                    <buy-now-action-card
                        :price="buyNowPrice"
                        :myUsername="myUsername"
                        :myRating="myRating"
                    ></buy-now-action-card>
                </v-col>
            </v-row>
            <v-row no-gutters class="px-6 py-6">
                <v-col>
                    <div class="d-flex flex-align-center">
                        <v-icon left small>mdi-clock</v-icon>
                        <span>Posted at {{ utils.toLongTimestamp(startTime) }}</span>
                    </div>
                    <div class="d-flex flex-align-center">
                        <v-icon left small>mdi-clock-outline</v-icon>
                        <span>Ends at {{ utils.toLongTimestamp(endTime) }}</span>
                    </div>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row no-gutters class="pa-6">
                <v-col>
                    <product-description :productId="id"></product-description>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row no-gutters class="pa-6">
                <v-col>
                    <bidder-list :productId="id"></bidder-list>
                </v-col>
            </v-row>
        </v-card>
        <featured-product-group :title="'Related products'" :products="relatedProducts"></featured-product-group>
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

import { generateMockProduct } from "@/utils/mockUtils";
import { toLongTimestamp } from "@/utils/timeUtils";

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
            utils: { toLongTimestamp },
            id: this.$route.params.id,
            primaryImage: null,
            secondaryImages: [],
            title: null,
            sellerUsername: null,
            sellerRating: null,
            myUsername: null,
            myRating: null,
            startTime: null,
            endTime: null,
            bidHighestPrice: null,
            bidHighestUser: null,
            bidHighestUserRating: null,
            bidPriceIncrement: null,
            buyNowPrice: null,
            isBlockedFromBidding: false,
            isOnWatchlist: false,
            relatedProducts: [],
        };
    },
    methods: {
        fetchProductInfo() {
            const newProduct = generateMockProduct()[0];
            this.primaryImage = newProduct.image;
            this.title = newProduct.title;
            this.startTime = newProduct.startTime;
            this.endTime = newProduct.endTime;
            this.sellerUsername = "seller0101";
            this.sellerRating = 4.5;
            this.myUsername = "userme42";
            this.myRating = "4.8";
            this.bidPriceIncrement = 100000;
            this.isBlockedFromBidding = false;
            this.bidHighestPrice = newProduct.bidHighestPrice;
            this.bidHighestUser = newProduct.bidHighestUser;
            this.bidHighestUserRating = 4.7;
            this.buyNowPrice = newProduct.buyNowPrice;
            this.isOnWatchlist = newProduct.isOnWatchlist;
        },
        fetchRelatedProducts() {
            this.relatedProducts = generateMockProduct(8);
        },
    },
    beforeMount() {
        this.fetchProductInfo();
        this.fetchRelatedProducts();
    },
};
</script>
