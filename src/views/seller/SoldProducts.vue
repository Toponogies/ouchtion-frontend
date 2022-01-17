<template>
    <v-data-table
        :loading="completedProducts.isLoading"
        loading-text="Loading data"
        :headers="completedProducts.headers"
        :items="completedProducts.items"
        :items-per-page="15"
        show-expand
        single-expand
        :expanded.sync="expandedRows"
    >
        <!-- Column: Image -->
        <template v-slot:[`item.primaryImage`]="{ item }">
            <v-img :src="item.primaryImage" max-width="64"></v-img>
        </template>

        <!-- Column: End time -->
        <template v-slot:[`item.endTime`]="{ item }">
            <span>{{ utils.toLongTimestamp(item.endTime) }}</span>
        </template>

        <!-- Column: Price -->
        <template v-slot:[`item.highestBidPrice`]="{ item }">
            <span>{{ utils.formatPrice(item.highestBidPrice) }}</span>
        </template>

        <!-- Column: Action buttons -->
        <template v-slot:[`item.actions`]="{ item }">
            <!-- Button with tooltip: Go to product details page of this item -->
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon @click="goToItem(item)" v-on="on" v-bind="attrs">
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                </template>
                <span>Go to item</span>
            </v-tooltip>
        </template>

        <!-- Expanded row -->
        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
                <v-container>
                    <!-- Bidder's review -->
                    <v-row no-gutters class="py-2" align="center">
                        <!-- Row header -->
                        <v-col cols="2">
                            <span class="text-overline">Bidder's Rating</span>
                        </v-col>

                        <!-- Bidder's rating -->
                        <v-col cols="1">
                            <v-row no-gutters justify="center">
                                <v-icon v-if="item.reviewToSeller.rating === +1">mdi-thumb-up</v-icon>
                                <v-icon v-else-if="item.reviewToSeller.rating === -1">mdi-thumb-down</v-icon>
                                <v-icon v-else>mdi-help</v-icon>
                            </v-row>
                        </v-col>

                        <!-- Bidder's comment -->
                        <v-col cols="9">
                            <span
                                v-if="item.reviewToSeller.rating === null && item.reviewToSeller.comment === null"
                                class="grey--text"
                            >
                                The seller has not left a review for this bidding yet.
                            </span>
                            <span
                                v-else-if="item.reviewToSeller.rating !== null && item.reviewToSeller.comment === null"
                                class="grey--text"
                            >
                                The seller did not left a comment for this review.
                            </span>
                            <span v-else>
                                {{ item.reviewToSeller.comment }}
                            </span>
                        </v-col>
                    </v-row>

                    <!-- Seller's review -->
                    <v-row no-gutters class="py-2" align="center">
                        <!-- Row header -->
                        <v-col cols="2">
                            <span class="text-overline">Your Rating</span>
                        </v-col>

                        <!-- Seller's rating -->
                        <v-col cols="1">
                            <v-row no-gutters justify="center">
                                <v-icon v-if="item.reviewToBidder.rating === +1">mdi-thumb-up</v-icon>
                                <v-icon v-else-if="item.reviewToBidder.rating === -1">mdi-thumb-down</v-icon>

                                <!-- Show a clickable menu if bidder has not left review yet -->
                                <v-menu v-else>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-on="on" v-bind="attrs">
                                            <v-icon v-if="currentReviewToBidder.rating === +1">mdi-thumb-up</v-icon>
                                            <v-icon v-else-if="currentReviewToBidder.rating === -1"
                                                >mdi-thumb-down</v-icon
                                            >
                                            <v-icon v-else>mdi-help</v-icon>
                                        </v-btn>
                                    </template>
                                    <v-list>
                                        <v-list-item
                                            v-for="option in ratingOptions"
                                            :key="option.value"
                                            @click="setCurrentRatingToSeller(option.value)"
                                        >
                                            <v-icon left>{{ option.icon }}</v-icon>
                                            <span>{{ option.label }}</span>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </v-row>
                        </v-col>

                        <!-- Seller's comment -->
                        <v-col cols="9">
                            <span
                                v-if="item.reviewToBidder.rating !== null && item.reviewToBidder.comment === null"
                                class="grey--text"
                            >
                                You did not left a comment for this review.
                            </span>
                            <span
                                v-else-if="item.reviewToBidder.rating !== null && item.reviewToBidder.comment !== null"
                            >
                                {{ item.reviewToBidder.comment }}
                            </span>
                            <!-- Show a textbox if bidder has not left review yet -->
                            <span v-else>
                                <v-textarea
                                    outlined
                                    v-model="currentReviewToBidder.comment"
                                    placeholder="Leave a comment (optional)"
                                    hide-details="true"
                                    rows="1"
                                ></v-textarea>
                            </span>
                        </v-col>
                    </v-row>

                    <!-- Seller's review -- Hint & Action line -->
                    <!-- Only shown if there's no review yet -->
                    <v-row no-gutters class="py-2" v-if="item.reviewToBidder.rating === null">
                        <v-col cols="3"></v-col>
                        <v-col cols="9">
                            <v-row no-gutters class="pb-4">
                                <span class="grey--text"> You cannot edit your review once submitted. </span>
                            </v-row>
                            <v-row no-gutters>
                                <v-btn
                                    color="primary"
                                    :disabled="!isCurrentReviewToBidderValid"
                                    @click="submitReviewToBidder"
                                    >Submit</v-btn
                                >
                                <div class="px-2"></div>
                                <v-btn @click="clearReviewToBidder">Clear</v-btn>
                                <v-spacer></v-spacer>
                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn color="error" v-on="on" v-bind="attrs" @click="submitBidderDidNotPay"
                                            >Bidder did not pay</v-btn
                                        >
                                    </template>
                                    <span>Auto leave a Bad rating with comment "Bidder did not pay"</span>
                                </v-tooltip>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-container>
            </td>
        </template>
    </v-data-table>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { toLongTimestamp } from "@/utils/timeUtils";
import { formatPrice } from "@/utils/priceUtils";

export default {
    name: "SoldProducts",
    data() {
        return {
            utils: { toLongTimestamp, formatPrice },
            expandedRows: [],
            currentReviewToBidder: {
                rating: null,
                comment: "",
            },
            ratingOptions: [
                { value: +1, label: "Good (+1)", icon: "mdi-thumb-up" },
                { value: -1, label: "Bad (-1)", icon: "mdi-thumb-down" },
            ],
        };
    },
    computed: {
        ...mapState("ProductModule", ["completedProducts"]),
        isCurrentReviewToBidderValid() {
            return this.currentReviewToBidder.rating !== null || ~this.currentReviewToBidder.comment.length > 0;
        },
    },
    methods: {
        ...mapActions("ProductModule", ["fetchCompleted", "leaveReviewCompleted"]),
        goToItem(item) {
            const nextPath = `/p/${item.id}`;
            if (this.$router.currentRoute.fullPath !== nextPath) {
                this.$router.push(nextPath);
            }
        },
        setCurrentRatingToSeller(value) {
            this.currentReviewToBidder.rating = value;
        },
        submitReviewToBidder() {
            this.leaveReviewCompleted({
                id: this.expandedRows[0].id,
                rating: this.currentReviewToBidder.rating,
                comment: this.currentReviewToBidder.comment.length > 0 ? this.currentReviewToBidder.comment : null,
            });
            this.clearReviewToBidder();
        },
        submitBidderDidNotPay() {
            this.leaveReviewCompleted({
                id: this.expandedRows[0].id,
                rating: -1,
                comment: "Bidder did not pay",
            });
            this.clearReviewToBidder();
        },
        clearReviewToBidder() {
            this.currentReviewToBidder = {
                rating: null,
                comment: "",
            };
        },
    },
    mounted() {
        this.fetchCompleted();
    },
};
</script>
