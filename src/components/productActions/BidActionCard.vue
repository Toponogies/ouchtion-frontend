<template>
    <v-card @click.stop="handleConfirmDialogOpen" :color="cardColor" elevation="4" :disabled="btnDisable">
        <!-- Header + decor -->
        <v-row no-gutters class="px-4 pt-4 pb-2">
            <div>BID</div>
            <v-spacer></v-spacer>
            <v-icon dark v-if="!btnDisable">mdi-arrow-right</v-icon>
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
import { mapState, mapMutations } from "vuex";
import { BID_AVAILABILITY, ROLES } from "@/utils/constants";
import UsernameCard from "@/components/productDetails/UsernameCard";
import BidActionModal from "@/components/productActions/BidActionModal";
import BidRequestModal from "@/components/productActions/BidRequestModal";
import { formatPrice } from "@/utils/priceUtils";
import { toRelativeTimestamp, isInCountdownThreshold } from "@/utils/timeUtils";

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
        ...mapState("CurrentProductInfoModule", ["endTime", "bid"]),
        ...mapState("CurrentProductDetailsBidderModule", ["bidAvailability"]),
        ...mapState("CurrentUserModule", ["role"]),

        cardColor: function () {
            switch (this.bidAvailability) {
                case BID_AVAILABILITY.CAN_BID:
                    return "orange darken-3 white--text";
                case BID_AVAILABILITY.REQUEST_REQUIRED:
                    return "orange darken-5 white--text";
                default:
                    return "grey darken-3 white--text";
            }
        },

        btnDisable: function () {
            switch (this.bidAvailability) {
                case BID_AVAILABILITY.CAN_BID:
                case BID_AVAILABILITY.REQUEST_REQUIRED:
                    return false;
                default:
                    return true;
            }
        },

        normalStatusLine: function () {
            switch (this.bidAvailability) {
                case BID_AVAILABILITY.CAN_BID:
                    return true;
                default:
                    return false;
            }
        },

        statusLine: function () {
            if (this.role !== ROLES.BIDDER) {
                return "You are not a bidder.";
            }
            switch (this.bidAvailability) {
                case BID_AVAILABILITY.IS_SOLD:
                    return "Product is sold.";
                case BID_AVAILABILITY.REQUEST_REQUIRED:
                    return "You must send a request to the seller.";
                case BID_AVAILABILITY.REQUEST_PENDING:
                    return "Please wait for seller's response to your request.";
                case BID_AVAILABILITY.REQUEST_FAILED:
                    return "You cannot bid on this product.";
                default:
                    return "Unknown state";
            }
        },
    },

    methods: {
        ...mapMutations("CurrentUserModule", {
            setLoginModalState: "setModalOpen",
        }),
        ...mapMutations("CurrentProductDetailsBidderModule", ["setBidModalState", "setBidRequestModalState"]),

        handleConfirmDialogOpen() {
            switch (this.role) {
                // For not logged-in users: show login modal
                case null:
                    this.setLoginModalState(true);
                    break;

                // For bidders: show the modal
                case ROLES.BIDDER:
                    switch (this.bidAvailability) {
                        case BID_AVAILABILITY.CAN_BID:
                            this.setBidModalState(true);
                            break;
                        case BID_AVAILABILITY.REQUEST_REQUIRED:
                            this.setBidRequestModalState(true);
                            break;
                        default:
                            // do nothing
                            break;
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
