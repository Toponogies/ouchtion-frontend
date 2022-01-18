<template>
    <v-container class="ma-0 pa-0">
        <!-- Image gallery -->
        <v-card class="pa-4 mb-4">
            <product-image-gallery></product-image-gallery>
        </v-card>

        <!-- Product details -->
        <v-card class="pa-0 mb-4">
            <!-- Title -->
            <v-row no-gutters class="px-6 pt-6 pb-3">
                <v-col>
                    <div class="text-h4 font-weight-light">{{ title }}</div>
                </v-col>
                <username-card class="mx-4" :username="seller.username" :rating="seller.rating"></username-card>
                <v-btn icon @click="toggleWatchState">
                    <v-icon v-if="isOnWatchlist === false">mdi-bookmark-outline</v-icon>
                    <v-icon v-else>mdi-bookmark</v-icon>
                </v-btn>
            </v-row>

            <!-- Action cards -->
            <v-row no-gutters class="px-6 pt-3">
                <v-col class="mr-2">
                    <bid-action-card></bid-action-card>
                </v-col>
                <v-col class="ml-2">
                    <buy-now-action-card></buy-now-action-card>
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
                    <product-description></product-description>
                </v-col>
            </v-row>

            <v-divider></v-divider>

            <!-- Bidder list -->
            <v-row no-gutters class="pa-6">
                <v-col>
                    <bidder-list></bidder-list>
                </v-col>
            </v-row>
        </v-card>

        <!-- Related products -->
        <featured-product-group :title="'Related products'" :products="relatedProducts"></featured-product-group>
    </v-container>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from "vuex";

import ProductImageGallery from "@/components/productDetails/ProductImageGallery";
import UsernameCard from "@/components/productDetails/UsernameCard";
import BidderList from "@/components/productDetails/BidderList";
import ProductDescription from "@/components/productDetails/ProductDescription";

import BidActionCard from "@/components/productActions/BidActionCard";
import BuyNowActionCard from "@/components/productActions/BuyNowActionCard";

import FeaturedProductGroup from "@/components/productListings/FeaturedProductGroup";

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
        };
    },
    computed: {
        ...mapState("CurrentProductModule", [
            "title",
            "seller",
            "startTime",
            "endTime",
            "categories",
            "bid",
            "buyNow",
            "isOnWatchlist",
            "relatedProducts",
        ]),
    },
    methods: {
        ...mapActions("CurrentProductModule", ["setProductId", "fetchAllDetails"]),

        handleCategoryClick(id) {
            const nextPath = `/search?cat=${id}`;
            if (this.$router.currentRoute.fullPath !== nextPath) {
                this.$router.push(nextPath);
            }
        },

        toggleWatchState() {
            // call add this product to watchlist
        },
    },

    beforeMount() {
        this.fetchAllDetails();
    },
    mounted() {
        scrollToTop(this);
    },

    beforeRouteUpdate(to, _, next) {
        // We have to manually set query on route update -- Vue Router is not "reactive" enough in this case (prolly)
        this.id = null;
        if (to.params.id) {
            this.id = to.params.id;
        }
        this.fetchAllDetails();
        next();
    },
};
</script>
