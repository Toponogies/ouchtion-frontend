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
                <span>{{ utils.formatPrice(currentHighestBidPrice) }}</span>
            </div>
        </v-row>

        <!-- Username card -->
        <v-row no-gutters class="px-4 pt-1 pb-2">
            <username-card
                :username="currentHighestBidUsername"
                :rating="currentHighestBidUsernameRating"
            ></username-card>
        </v-row>

        <!-- Divider -->
        <v-divider class="my-2"></v-divider>

        <!-- Status line (normal) -->
        <v-row no-gutters class="px-4 pt-2 pb-4" v-if="!isBlockedFromBidding">
            <v-icon dark small left>mdi-timer-sand-empty</v-icon>
            <div>Ends in {{ formattedEndTime }}</div>
        </v-row>

        <!-- Status line (blocked from bidding) -->
        <v-row no-gutters class="px-4 pt-2 pb-4" v-else>
            <v-icon dark small left>mdi-close-circle</v-icon>
            <div>You are not allowed to bid on this product.</div>
        </v-row>

        <!-- Bid confirmation modal -->
        <v-dialog max-width="640" v-model="confirmDialogOpened" persistent>
            <v-card>
                <!-- Header (Manual) -->
                <v-row no-gutters class="px-4 py-4">
                    <div class="text-h6 font-weight-bold">Place Your Bid&hellip;</div>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="handleConfirmDialogCancel">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-row>

                <!-- Current price -->
                <v-row no-gutters cols="12" class="px-4 pb-4">
                    <v-col cols="6">
                        <username-card
                            :username="currentHighestBidUsername"
                            :rating="currentHighestBidUsernameRating"
                        ></username-card>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            class="dialog-price-field"
                            outlined
                            disabled
                            :value="utils.formatPrice(currentHighestBidPrice)"
                            :hint="'Current highest price'"
                            persistent-hint
                        >
                            <template v-slot:prepend>
                                <div>&#x20AB;</div>
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>

                <!-- New price -->
                <v-row no-gutters cols="12" class="px-4 pb-4" v-if="!autoBidEnabled">
                    <v-col cols="6">
                        <username-card :username="myUsername" :rating="myRating"></username-card>
                    </v-col>
                    <v-col cols="6">
                        <v-form v-model="newPriceValid">
                            <v-text-field
                                v-model="newPrice"
                                class="dialog-price-field"
                                outlined
                                :placeholder="`≥ ${utils.formatPrice(suggestedBidPrice)}`"
                                :rules="[priceRules.invalid, priceRules.moreThanSuggested]"
                                :hint="'Your price'"
                                persistent-hint
                                clearable
                            >
                                <template v-slot:prepend>
                                    <div>&#x20AB;</div>
                                </template>
                            </v-text-field>
                        </v-form>
                    </v-col>
                </v-row>

                <!-- Confirm button (Manual) -->
                <v-row no-gutters class="px-4" v-if="!autoBidEnabled">
                    <v-spacer></v-spacer>
                    <v-btn
                        color="orange darken-3 white--text"
                        @click="handleConfirmDialogOK"
                        large
                        :disabled="!newPriceValid"
                    >
                        Confirm Manual Bid
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-row>

                <v-divider class="my-6"></v-divider>

                <!-- Header (Auto-bidding) -->
                <v-row no-gutters class="px-4 pb-4 d-flex flex-column">
                    <div class="text-h6 font-weight-bold pb-2">&hellip;or Turn On Auto-bidding</div>
                    <div class="text-body-1">
                        Your price will automatically be set just high enough to win over currently highest's bidder
                        price, until you've hit maximum price you've set below.
                    </div>
                </v-row>

                <!-- Max auto-bidding price -->
                <v-row no-gutters class="px-4 pb-4">
                    <v-spacer></v-spacer>
                    <v-col cols="6">
                        <v-form v-model="newAutoBidPriceValid">
                            <v-text-field
                                v-model="autoBidMaximumPrice"
                                class="dialog-price-field"
                                outlined
                                :placeholder="`≥ ${utils.formatPrice(suggestedBidPrice)}`"
                                :rules="[priceRules.invalid, priceRules.moreThanSuggested]"
                                :hint="'Your maximum auto-bidding price'"
                                :disabled="autoBidEnabled"
                                persistent-hint
                                clearable
                            >
                                <template v-slot:prepend>
                                    <div>&#x20AB;</div>
                                </template>
                            </v-text-field>
                        </v-form>
                    </v-col>
                    <v-spacer></v-spacer>
                </v-row>

                <!-- Confirm button (Auto-bidding) -->
                <v-row no-gutters class="px-4 pb-4">
                    <v-spacer></v-spacer>
                    <v-btn
                        color="orange--text text--darken-3"
                        @click="handleConfirmDialogAutobidOK"
                        large
                        :disabled="!newAutoBidPriceValid"
                        v-if="!autoBidEnabled"
                    >
                        Turn on Auto-bidding
                    </v-btn>
                    <v-btn
                        color="orange--text text--darken-3"
                        @click="handleConfirmDialogAutobidOff"
                        large
                        :disabled="!newAutoBidPriceValid"
                        v-else
                    >
                        Turn off Auto-bidding
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-row>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import UsernameCard from "@/components/productDetails/UsernameCard";
import { formatPrice } from "@/utils/priceUtils";
import { toRelativeTimestamp, isInCountdownThreshold } from "@/utils/timeUtils";

export default {
    name: "BidActionCard",
    props: {
        currentHighestBidPrice: Number,
        currentHighestBidUsername: String,
        currentHighestBidUsernameRating: Number,
        myUsername: String,
        myRating: String,
        priceIncrement: Number,
        endTime: String,
        isBlockedFromBidding: {
            type: Boolean,
            default: false,
        },
    },
    components: { UsernameCard },
    data() {
        return {
            utils: { formatPrice },
            confirmDialogOpened: false,
            formattedEndTime: toRelativeTimestamp(this.endTime),
            autoBidMaximumPrice: null,
            autoBidEnabled: false,
            newPrice: null,
            newPriceValid: null,
            newAutoBidPriceValid: null,
            priceRules: {
                invalid: (value) => !Number.isNaN(parseInt(value)) || "Please enter a valid price",
                moreThanSuggested: (value) =>
                    parseInt(value) >= this.suggestedBidPrice || "Your price must NOT be less than the suggested price",
            },
        };
    },
    computed: {
        suggestedBidPrice: function () {
            return this.currentHighestBidPrice + this.priceIncrement;
        },
        cardColor: function () {
            return this.isBlockedFromBidding ? "grey darken-3 white--text" : "orange darken-3 white--text";
        },
    },
    methods: {
        handleConfirmDialogOpen() {
            this.newPrice = this.suggestedBidPrice;
            this.confirmDialogOpened = true;
        },
        handleConfirmDialogOK() {
            this.confirmDialogOpened = false;
        },
        handleConfirmDialogAutobidOK() {
            this.confirmDialogOpened = false;
            this.autoBidEnabled = true;
        },
        handleConfirmDialogAutobidOff() {
            this.confirmDialogOpened = false;
            this.autoBidEnabled = false;
        },
        handleConfirmDialogCancel() {
            this.confirmDialogOpened = false;
        },
        _refreshEndTime() {
            this.formattedEndTime = toRelativeTimestamp(this.endTime);
            setTimeout(this._refreshEndTime, 1000);
        },
    },
    mounted() {
        console.log(this.endTime);
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
