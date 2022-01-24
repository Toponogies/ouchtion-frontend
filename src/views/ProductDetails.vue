<template>
    <v-container class="ma-0 pa-0">
        <!-- Placeholder (product not exists) -->
        <div v-if="title === null">
            <v-card class="pa-4">
                <v-row no-gutters justify="center" align="center" class="d-flex flex-column">
                    <v-icon large color="grey" class="mb-1">mdi-package-variant-closed</v-icon>
                    <div class="grey--text mt-1">Product does not exists</div>
                </v-row>
            </v-card>
        </div>

        <!-- Details (product *do* exists) -->
        <div v-else>
            <!-- Image gallery -->
            <v-container class="pa-0 mb-4" :loading="isLoading">
                <product-image-gallery></product-image-gallery>
            </v-container>

            <!-- Product details -->
            <v-card class="pa-0 mb-4">
                <!-- Title -->
                <v-row no-gutters class="px-6 pt-6 pb-3">
                    <v-col>
                        <div class="text-h4 font-weight-light">{{ title }}</div>
                    </v-col>
                    <username-card class="mx-4" :username="seller.username" :rating="seller.rating"></username-card>
                    <v-btn icon @click="toggleWatchState" v-if="role === utils.ROLES.BIDDER">
                        <v-icon v-if="local_isOnWatchlist === false">mdi-bookmark-outline</v-icon>
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

                <!-- Bidder requests (only shown to Sellers) -->
                <v-row no-gutters class="pa-6" v-if="role === utils.ROLES.SELLER">
                    <v-col>
                        <bidder-requests></bidder-requests>
                    </v-col>
                </v-row>

                <!-- Bidder list -->
                <v-row no-gutters class="pa-6">
                    <v-col>
                        <bidder-list></bidder-list>
                    </v-col>
                </v-row>
            </v-card>

            <!-- Related products -->
            <featured-product-group :title="'Related products'" :products="relatedProducts"></featured-product-group>
        </div>
    </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { ROLES } from "@/utils/constants";

import ProductImageGallery from "@/components/productDetails/ProductImageGallery";
import UsernameCard from "@/components/productDetails/UsernameCard";
import BidderRequests from "@/components/productDetails/BidderRequests";
import BidderList from "@/components/productDetails/BidderList";
import ProductDescription from "@/components/productDetails/ProductDescription";

import BidActionCard from "@/components/productActions/BidActionCard";
import BuyNowActionCard from "@/components/productActions/BuyNowActionCard";

import FeaturedProductGroup from "@/components/productListings/FeaturedProductGroup";

import { toLongTimestamp } from "@/utils/timeUtils";
import { scrollToTop } from "@/utils/scrollToTop";
import { isOnUserWatchlist } from "@/utils/isOnUserWatchlist";

export default {
    name: "ProductDetails",
    components: {
        ProductImageGallery,
        FeaturedProductGroup,
        UsernameCard,
        BidderRequests,
        BidderList,
        ProductDescription,
        BidActionCard,
        BuyNowActionCard,
    },

    data() {
        return {
            utils: { toLongTimestamp, ROLES },
            id: this.$route.params.id,
            local_isOnWatchlist: false,
        };
    },

    computed: {
        ...mapState("CurrentProductInfoModule", [
            "isLoading",
            "title",
            "seller",
            "startTime",
            "endTime",
            "categories",
            "bid",
            "buyNow",
            "relatedProducts",
        ]),
        ...mapState("CurrentUserModule", ["role"]),
        ...mapState("CurrentUserModule", {
            currentUserId: "id",
        }),
    },

    methods: {
        ...mapActions("CurrentProductInfoModule", ["setProductId", "getAllInfo"]),
        ...mapActions("CurrentProductDetailsBidderModule", { getInfoForBidders: "getAllInfo" }),
        ...mapActions("CurrentProductDetailsSellerModule", { getInfoForSellers: "getAllInfo" }),
        ...mapMutations("CurrentProductInfoModule", ["clearAll"]),
        ...mapActions("BidderWatchlistModule", ["add", "remove"]),

        handleCategoryClick(id) {
            const nextPath = `/search?cat=${id}`;
            if (this.$router.currentRoute.fullPath !== nextPath) {
                this.$router.push(nextPath);
            }
        },

        toggleWatchState() {
            this.local_isOnWatchlist = !this.local_isOnWatchlist;
            if (this.local_isOnWatchlist) {
                this.add(this.id);
            } else {
                this.remove(this.id);
            }
        },
    },

    beforeMount() {
        this.clearAll();
        this.setProductId(this.$route.params.id);
    },

    async mounted() {
        this.getAllInfo();
        if (this.role === ROLES.BIDDER) {
            this.getInfoForBidders();
            this.local_isOnWatchlist = await isOnUserWatchlist(this.id);
        }
        if (this.currentUserId === this.seller.id) {
            this.getInfoForSellers();
        }

        scrollToTop(this);
    },

    updated() {
        scrollToTop(this);
    },

    beforeRouteUpdate(to, _, next) {
        // We have to manually set query on route update -- Vue Router is not "reactive" enough in this case (prolly)
        this.setProductId(null);
        if (to.params.id) {
            this.setProductId(to.params.id);
        }
        this.clearAll();
        this.getAllInfo();
        next();
    },
};
</script>
