<template>
    <v-card @click.stop="handleConfirmDialogOpen" :color="cardColor" elevation="4" :disabled="isBlockedFromBidding">
        <!-- Header + decor -->
        <v-row no-gutters class="px-4 pt-4 pb-2">
            <div>BID</div>
            <v-spacer></v-spacer>
            <v-icon dark v-if="!isBlockedFromBidding">mdi-arrow-right</v-icon>
        </v-row>

        <!-- Price -->
        <v-row no-gutters class="px-4 pt-2 pb-1">
            <div class="text-h5 font-weight-bold">
                <span>&#x20AB; </span>
                <span>{{ utils.formatPrice(bid.highestPrice) }}</span>
            </div>
        </v-row>

        <!-- Username card -->
        <v-row no-gutters class="px-4 pt-1 pb-2">
            <username-card :username="bid.highestUser.username" :rating="bid.highestUser.rating"></username-card>
        </v-row>

        <!-- Divider -->
        <v-divider class="my-2"></v-divider>

        <!-- Status line (normal) -->
        <v-row no-gutters class="px-4 pt-2 pb-4" v-if="normalStatusLine">
            <v-icon dark small left>mdi-timer-sand-empty</v-icon>
            <div>Ends in {{ formattedEndTime }}</div>
        </v-row>

        <!-- Status line (blocked from bidding) -->
        <v-row no-gutters class="px-4 pt-2 pb-4" v-else>
            <v-icon dark small left>mdi-close-circle</v-icon>
            <div>{{ statusLine }}</div>
        </v-row>

        <!-- Bid confirmation modal -->
        <bid-action-modal></bid-action-modal>

        <!-- Bid request modal -->
        <bid-request-modal></bid-request-modal>
    </v-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { ROLES } from "@/utils/constants";
import UsernameCard from "@/components/productDetails/UsernameCard";
import BidActionModal from "@/components/productActions/BidActionModal";
import BidRequestModal from "@/components/productActions/BidRequestModal";
import { formatPrice } from "@/utils/priceUtils";
import { toRelativeTimestamp, isInCountdownThreshold, fromTimestamp } from "@/utils/timeUtils";

export default {
    name: "BidActionCard",
    components: { UsernameCard, BidActionModal, BidRequestModal },

    data() {
        return {
            utils: { formatPrice },
            formattedEndTime: toRelativeTimestamp(this.endTime),
        };
    },

    computed: {
        ...mapState("CurrentProductModule", ["endTime", "bid", "isBlockedFromBidding", "isSold", "request"]),
        ...mapState("CurrentUserModule", ["role"]),
        cardColor: function () {
            return this.isBlockedFromBidding ? "grey darken-3 white--text" : "orange darken-3 white--text";
        },

        normalStatusLine: function () {
            return !this.isSold && !this.isBlockedFromBidding;
        },
        statusLine: function () {
            if (this.isSold) {
                return "Product is sold.";
            } else if (this.isBlockedFromBidding && !this.request.isSent && !this.request.isBlockedFromRequesting) {
                return "You must send a request to the seller.";
            } else if (this.isBlockedFromBidding && this.request.isSent && !this.request.isBlockedFromRequesting) {
                return "Please wait for seller's response to your request.";
            } else if (this.isBlockedFromBidding && this.request.isSent && this.request.isBlockedFromRequesting) {
                return "You cannot bid on this product.";
            }
        },
    },

    methods: {
        ...mapMutations("AuthModule", {
            setLoginModalState: "setModalState",
        }),
        ...mapMutations("CurrentProductModule", ["setBidModalState", "setBidRequestModalState"]),

        handleConfirmDialogOpen() {
            switch (this.role) {
                // For not logged-in users: show login modal
                case null:
                    this.setLoginModalState(true);
                    break;

                // For bidders: show the modal
                case ROLES.BIDDER:
                    if (!this.isBlockedFromBidding) {
                        this.newPrice = this.suggestedBidPrice;
                        this.setBidModalState(true);
                    } else if (
                        this.isBlockedFromBidding &&
                        !this.request.isSent &&
                        !this.request.isBlockedFromRequesting
                    ) {
                        this.setBidRequestModalState(true);
                    }
                    break;

                // For everyone else: do nothing
                default:
                    break;
            }
        },

        _refreshEndTime() {
            this.formattedEndTime = toRelativeTimestamp(this.endTime);
            setTimeout(this._refreshEndTime, 1000);
        },
    },

    mounted() {
        if (isInCountdownThreshold(this.endTime)) {
            this._refreshEndTime();
        }
    },
};
</script>

<style scoped>
.dialog-price-field >>> .v-input__prepend-outer,
.dialog-price-field >>> input {
    font-size: 2em;
}
</style>
