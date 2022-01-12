<template>
    <v-container class="ma-0 pa-0">
        <!-- Image gallery -->
        <v-card class="pa-4 mb-4">
            <product-image-gallery :productId="id"></product-image-gallery>
        </v-card>

        <!-- Product details -->
        <v-card class="pa-0 mb-4">
            <!-- Title -->
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

            <!-- Action cards -->
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

            <!-- Start/end time -->
            <v-row no-gutters class="px-6 pt-6 pb-3">
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

            <!-- Category list -->
            <v-row no-gutters class="px-6 pt-3 pb-6">
                <v-col>
                    <v-chip
                        class="mr-2 mb-2"
                        v-for="category in categories"
                        :key="category.category_id"
                        @click.stop="handleCategoryClick(category.category_id)"
                    >
                        {{ category.name }}
                    </v-chip>
                </v-col>
            </v-row>

            <v-divider></v-divider>

            <!-- Description -->
            <v-row no-gutters class="pa-6">
                <v-col>
                    <product-description :productId="id"></product-description>
                </v-col>
            </v-row>

            <v-divider></v-divider>

            <!-- Bidder list -->
            <v-row no-gutters class="pa-6">
                <v-col>
                    <bidder-list :productId="id"></bidder-list>
                </v-col>
            </v-row>
        </v-card>

        <!-- Related products -->
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

import { generateMockProduct, generateCategories } from "@/utils/mockUtils";
import { toLongTimestamp } from "@/utils/timeUtils";
import { scrollToTop } from "@/utils/scrollToTop";

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
            categories: [],
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
            this.categories = generateCategories();
            this.relatedProducts = generateMockProduct(8);
        },
        handleCategoryClick(id) {
            this.expandedPanels = []; // Close the category list if expanded
            const nextPath = `/search?cat=${id}`;
            if (this.$router.currentRoute.fullPath !== nextPath) {
                this.$router.push(nextPath);
            }
        },
    },
    beforeMount() {
        this.fetchProductInfo();
    },
    mounted() {
        scrollToTop(this);
    },
    beforeUpdate() {
        scrollToTop(this);
    },
    beforeRouteUpdate(to, _, next) {
        // We have to manually set query on route update -- Vue Router is not "reactive" enough in this case (prolly)
        this.id = null;
        if (to.params.id) {
            this.id = to.params.id;
        }
        this.fetchProductInfo();
        next();
    },
};
</script>
