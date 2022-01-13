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
import { mapState, mapActions } from "vuex";

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

import { getProduct } from "@/api/product";
import { getUserWithPoint } from "@/api/user";

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
        ...mapState("CurrentUserModule", {
            currentUsername: "username",
            currentUserRating: "rating",
        }),
    },
    methods: {
        ...mapActions("CurrentProductModule", ["setProductId", "fetchAllDetails"]),

        async fetchProductInfo() {
            try {
                const newProduct = await getProduct(this.id);
                // this.primaryImage = newProduct.avatar;
                // this.title = newProduct.name;
                // this.startTime = newProduct.start_at;
                // this.endTime = newProduct.end_at;
                // this.bidPriceIncrement = newProduct.step_price;
                // this.isBlockedFromBidding = newProduct.is_sold == false ? false : true;
                // this.bidHighestPrice = newProduct.current_price;
                // this.buyNowPrice = newProduct.buy_price;

                // const seller = await getUserWithPoint(newProduct.seller_id)
                // this.sellerUsername = seller.full_name;
                // this.sellerRating = seller.point;

                // const buyer = await getUserWithPoint(newProduct.buyer_id)
                // this.bidHighestUser = buyer.full_name;
                // this.bidHighestUserRating = buyer.point;

                // chưa xử lý
                this.myUsername = "userme42";
                this.myRating = "4.8";
                // this.isOnWatchlist = newProduct.isOnWatchlist;
                // this.categories = generateCategories();
                // this.relatedProducts = generateMockProduct(8);
            } catch (error) {
                console.log(error.response.data);
            }
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
