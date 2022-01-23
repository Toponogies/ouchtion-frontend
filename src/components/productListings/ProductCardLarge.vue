<template>
    <v-card class="flex-grow-1" tile elevation="4" @click="handleProductClick">
        <div class="d-flex">
            <div class="ma-0">
                <v-img :src="image" width="200" min-height="200" class="fill-height">
                    <template v-slot:placeholder>
                        <v-row class="fill-height ma=0" align="center" justify="center">
                            <v-progress-circular indeterminate></v-progress-circular>
                        </v-row>
                    </template>
                </v-img>
            </div>
            <div class="ml-2 flex-grow-1">
                <v-card-title>
                    <span>{{ title }}</span>
                    <v-spacer></v-spacer>
                    <v-chip color="red white--text" small class="mr-2" v-if="isNewProduct">NEW</v-chip>
                    <v-btn icon @click.stop="toggleWatchState" v-if="role === utils.ROLES.BIDDER">
                        <v-icon v-if="local_isOnWatchlist === false">mdi-bookmark-outline</v-icon>
                        <v-icon v-else>mdi-bookmark</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text>
                    <v-row class="ma-n3" align="center">
                        <v-col cols="5">
                            <span class="text-h6 orange--text font-weight-bold">
                                &#x20AB; {{ formattedBidHighestPrice }}
                            </span>
                        </v-col>
                        <v-col>
                            <span class="orange--text">
                                {{ bidderCount }} bidding &bull; Highest by {{ bidHighestUser }}
                            </span>
                        </v-col>
                    </v-row>
                    <v-row class="ma-n3" align="center" v-if="buyNowPrice">
                        <v-col cols="5">
                            <span class="text-h6 red--text font-weight-bold">
                                &#x20AB; {{ formattedBuyNowPrice }}
                            </span>
                        </v-col>
                        <v-col>
                            <span class="red--text"> Buy Now 🔥 </span>
                        </v-col>
                    </v-row>
                    <v-row class="ma-n3" align="center">
                        <v-col>
                            <v-divider></v-divider>
                        </v-col>
                    </v-row>
                    <v-row class="ma-n3" align="center">
                        <v-col>
                            <v-icon left small>mdi-account-multiple</v-icon>
                            <span>Posted at {{ formattedStartTime }}</span>
                        </v-col>
                    </v-row>
                    <v-row class="ma-n3" align="center">
                        <v-col>
                            <v-icon left small>mdi-timer-sand-empty</v-icon>
                            <span>Ends at {{ formattedEndTime }}</span>
                        </v-col>
                    </v-row>
                </v-card-text>
            </div>
        </div>
    </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { ROLES } from "@/utils/constants";
import { formatPrice } from "@/utils/priceUtils";
import { isNewProduct, toLongTimestamp } from "@/utils/timeUtils";

export default {
    name: "ProductCardLarge",
    props: {
        id: String,
        image: String,
        title: String,
        startTime: String,
        endTime: String,
        bidderCount: Number,
        bidHighestPrice: Number,
        bidHighestUser: String,
        buyNowPrice: Number,
        isOnWatchlist: Boolean,
    },
    data() {
        return {
            utils: { ROLES },
            local_isOnWatchlist: this.isOnWatchlist,
        };
    },
    watch: {
        local_isOnWatchlist(newVal) {
            // add to watchlist
            if (newVal) this.add(this.id);
            // remove from watchlist
            else this.remove(this.id);
        },
    },

    computed: {
        ...mapState("CurrentUserModule", ["role"]),
        isNewProduct: function () {
            return isNewProduct(this.startTime);
        },
        formattedBidHighestPrice: function () {
            return formatPrice(this.bidHighestPrice);
        },
        formattedBuyNowPrice: function () {
            return formatPrice(this.buyNowPrice);
        },
        formattedStartTime: function () {
            return toLongTimestamp(this.startTime);
        },
        formattedEndTime: function () {
            return toLongTimestamp(this.endTime);
        },
    },

    methods: {
        ...mapActions("BidderWatchlistModule", ["add", "remove"]),
        toggleWatchState() {
            this.local_isOnWatchlist = !this.local_isOnWatchlist;
        },
        handleProductClick() {
            const nextPath = `/p/${this.id}`;
            if (this.$router.currentRoute.fullPath !== nextPath) {
                this.$router.push(nextPath);
            }
        },
    },
};
</script>
