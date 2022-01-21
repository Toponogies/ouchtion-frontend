<template>
    <v-data-table
        :loading="completedBids.isLoading"
        loading-text="Loading data"
        :headers="completedBids.headers"
        :items="completedBids.items"
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
                    <!-- Seller's review -->
                    <v-row no-gutters class="py-2" align="center">
                        <!-- Row header -->
                        <v-col cols="2">
                            <span class="text-overline">Seller's Rating</span>
                        </v-col>

                        <!-- Seller's rating -->
                        <v-col cols="1">
                            <v-row no-gutters justify="center">
                                <v-icon v-if="item.reviewToBidder.rating === +1">mdi-thumb-up</v-icon>
                                <v-icon v-else-if="item.reviewToBidder.rating === -1">mdi-thumb-down</v-icon>
                                <v-icon v-else>mdi-help</v-icon>
                            </v-row>
                        </v-col>

                        <!-- Seller's comment -->
                        <v-col cols="9">
                            <span v-if="item.reviewToBidder.rating === null" class="grey--text">
                                The seller has not left a review for this bidding yet.
                            </span>
                            <span
                                v-else-if="
                                    item.reviewToBidder.rating !== null &&
                                    (item.reviewToBidder.comment === null || item.reviewToBidder.comment.length === 0)
                                "
                                class="grey--text"
                            >
                                The seller did not left a comment for this review.
                            </span>
                            <span v-else>
                                {{ item.reviewToBidder.comment }}
                            </span>
                        </v-col>
                    </v-row>

                    <!-- Bidder's review -->
                    <v-row no-gutters class="py-2" align="center">
                        <!-- Row header -->
                        <v-col cols="2">
                            <span class="text-overline">Your Rating</span>
                        </v-col>

                        <!-- Bidder's rating -->
                        <v-col cols="1">
                            <v-row no-gutters justify="center">
                                <v-icon v-if="item.reviewToSeller.rating === +1">mdi-thumb-up</v-icon>
                                <v-icon v-else-if="item.reviewToSeller.rating === -1">mdi-thumb-down</v-icon>

                                <!-- Show a clickable menu if bidder has not left review yet -->
                                <v-menu v-else>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn icon v-on="on" v-bind="attrs">
                                            <v-icon v-if="currentReviewToSeller.rating === +1">mdi-thumb-up</v-icon>
                                            <v-icon v-else-if="currentReviewToSeller.rating === -1"
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

                        <!-- Bidder's comment -->
                        <v-col cols="9">
                            <span
                                v-if="
                                    item.reviewToSeller.rating !== null &&
                                    (item.reviewToSeller.comment === null || item.reviewToSeller.comment.length === 0)
                                "
                                class="grey--text"
                            >
                                You did not left a comment for this review.
                            </span>
                            <span
                                v-else-if="item.reviewToSeller.rating !== null && item.reviewToSeller.comment !== null"
                            >
                                {{ item.reviewToSeller.comment }}
                            </span>
                            <!-- Show a textbox if bidder has not left review yet -->
                            <span v-else>
                                <v-textarea
                                    outlined
                                    v-model="currentReviewToSeller.comment"
                                    placeholder="Leave a comment (optional)"
                                    hide-details="true"
                                    rows="1"
                                ></v-textarea>
                            </span>
                        </v-col>
                    </v-row>

                    <!-- Bidder's review -- Hint & Action line -->
                    <!-- Only shown if there's no review yet -->
                    <v-row no-gutters class="py-2" v-if="item.reviewToSeller.rating === null">
                        <v-col cols="3"></v-col>
                        <v-col cols="9">
                            <v-row no-gutters class="pb-4">
                                <span class="grey--text"> You cannot edit your review once submitted. </span>
                            </v-row>
                            <v-row no-gutters>
                                <v-btn
                                    color="primary"
                                    :disabled="!isCurrentReviewToSellerValid"
                                    @click="submitReviewToSeller"
                                    >Submit</v-btn
                                >
                                <div class="px-2"></div>
                                <v-btn @click="clearReviewToSeller">Clear</v-btn>
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
    name: "CompletedBids",
    data() {
        return {
            utils: { toLongTimestamp, formatPrice },
            expandedRows: [],
            currentReviewToSeller: {
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
        ...mapState("BiddingModule", ["completedBids"]),
        isCurrentReviewToSellerValid() {
            return this.currentReviewToSeller.rating !== null || ~this.currentReviewToSeller.comment.length > 0;
        },
    },
    methods: {
        ...mapActions("BiddingModule", ["fetchCompleted", "leaveReviewCompleted"]),
        goToItem(item) {
            const nextPath = `/p/${item.id}`;
            if (this.$router.currentRoute.fullPath !== nextPath) {
                this.$router.push(nextPath);
            }
        },
        setCurrentRatingToSeller(value) {
            this.currentReviewToSeller.rating = value;
        },
        submitReviewToSeller() {
            this.leaveReviewCompleted({
                id: this.expandedRows[0].id,
                rating: this.currentReviewToSeller.rating,
                comment: this.currentReviewToSeller.comment.length > 0 ? this.currentReviewToSeller.comment : null,
            });
            this.clearReviewToSeller();
        },
        clearReviewToSeller() {
            this.currentReviewToSeller = {
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
