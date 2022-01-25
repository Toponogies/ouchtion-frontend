<template>
    <v-card
        @click="handleConfirmDialogOpen"
        :color="cardColor"
        elevation="4"
        :disabled="!isBuyNowOptionAvailable && btnDisable"
    >
        <!-- Header + Decor -->
        <v-row no-gutters class="px-4 pt-4 pb-2">
            <div>BUY NOW</div>
            <v-spacer></v-spacer>
            <v-icon dark v-if="isBuyNowOptionAvailable">mdi-arrow-right</v-icon>
        </v-row>

        <!-- Price -->
        <v-row no-gutters class="px-4 pt-2 pb-1">
            <div class="text-h5 font-weight-bold">
                <span v-if="isBuyNowOptionAvailable">&#x20AB; </span>
                <span>{{ formattedPrice }}</span>
            </div>
        </v-row>

        <!-- Dummy username card (to make sure this card has even height to BidActionCard) -->
        <v-row no-gutters class="px-4 pt-1 pb-2" style="visibility: collapse">
            <username-card></username-card>
        </v-row>

        <!-- Divider -->
        <v-divider class="my-2"></v-divider>

        <!-- Status line (normal) -->
        <v-row no-gutters class="px-4 pt-2 pb-4" v-if="isBuyNowOptionAvailable">
            <v-icon dark left>mdi-clock-fast</v-icon>
            <div>Skip bidding and pay now</div>
        </v-row>

        <!-- Status line (disabled) -->
        <v-row no-gutters class="px-4 pt-2 pb-4" v-else>
            <v-icon dark left small>mdi-close-circle</v-icon>
            <div>The seller does not allow buying this product immediately.</div>
        </v-row>

        <!-- Buy now confirmation modal -->
        <buy-now-action-modal></buy-now-action-modal>
    </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { BID_AVAILABILITY, ROLES } from "@/utils/constants";
import UsernameCard from "@/components/productDetails/UsernameCard";
import BuyNowActionModal from "@/components/productActions/BuyNowActionModal";
import { formatPrice } from "@/utils/priceUtils";

export default {
    name: "BuyNowActionCard",
    components: { UsernameCard, BuyNowActionModal },
    props: ["price", "myUsername", "myRating"],

    data() {
        return {
            utils: { formatPrice },
            confirmDialogOpened: false,
        };
    },

    computed: {
        ...mapState("CurrentUserModule", ["role"]),
        ...mapState("CurrentProductModule", ["buyNow", "bidAvailability"]),

        isBuyNowOptionAvailable: function () {
            return this.buyNow.price !== null;
        },

        cardColor: function () {
            if (this.role === ROLES.SELLER || this.role === ROLES.ADMIN) {
                return "red darken-3 white--text";
            }

            if (!this.isBuyNowOptionAvailable) {
                return "grey darken-3 white--text";
            }

            switch (this.bidAvailability) {
                case BID_AVAILABILITY.IS_SOLD:
                    return "grey darken-3 white--text";
                default:
                    return "red darken-3 white--text";
            }
        },

        formattedPrice: function () {
            return this.isBuyNowOptionAvailable ? this.utils.formatPrice(this.buyNow.price) : "Not applicable";
        },

        btnDisable: function () {
            if (this.role === ROLES.SELLER || this.role === ROLES.ADMIN) return true;

            switch (this.bidAvailability) {
                case BID_AVAILABILITY.IS_SOLD:
                    return true;
                default:
                    return false;
            }
        },
    },

    methods: {
        ...mapMutations("AuthModule", {
            setLoginModalState: "setModalState",
        }),
        ...mapMutations("CurrentProductModule", ["setBuyNowModalState"]),
        handleConfirmDialogOpen() {
            switch (this.role) {
                // For not logged-in users: show login modal
                case null:
                    this.setLoginModalState(true);
                    break;

                // For bidders: show the modal
                case ROLES.BIDDER:
                    switch (this.bidAvailability) {
                        case BID_AVAILABILITY.IS_SOLD:
                            break;
                        default:
                            this.setBuyNowModalState(true);
                            break;
                    }
                    break;

                // For everyone else: do nothing
                default:
                    break;
            }
        },
    },
};
</script>

<style scoped>
.dialog-price-field >>> .v-input__prepend-outer,
.dialog-price-field >>> input {
    font-size: 2em;
}
</style>
