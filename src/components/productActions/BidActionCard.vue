<template>
    <v-card @click.stop="handleConfirmDialogOpen" color="orange darken-3 white--text" elevation="4">
        <v-row no-gutters class="px-4 pt-4 pb-2">
            <div>BID</div>
            <v-spacer></v-spacer>
            <v-icon dark>mdi-arrow-right</v-icon>
        </v-row>
        <v-row no-gutters class="px-4 pt-2 pb-1">
            <div class="text-h5 font-weight-bold">&#x20AB; 1499999</div>
        </v-row>
        <v-row no-gutters class="px-4 pt-1 pb-2">
            <username-card :username="'username'" :rating="4.6"></username-card>
        </v-row>
        <v-divider class="my-2"></v-divider>
        <v-row no-gutters class="px-4 pt-2 pb-4">
            <v-icon dark small left>mdi-timer-sand-empty</v-icon>
            <div>Ends in 00:00:00</div>
        </v-row>
        <v-dialog max-width="640" v-model="confirmDialogOpened" persistent>
            <v-card>
                <v-row no-gutters class="px-4 py-4">
                    <div class="text-h6 font-weight-bold">Place Your Bid&hellip;</div>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="handleConfirmDialogCancel">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-row>
                <v-row no-gutters cols="12" class="px-4 pb-4">
                    <v-col cols="6">
                        <username-card :username="'username'" :rating="4.6"></username-card>
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
                <v-row no-gutters cols="12" class="px-4 pb-4" v-if="!autoBidEnabled">
                    <v-col cols="6">
                        <username-card :username="'You'" :rating="4.6"></username-card>
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
                <v-row no-gutters class="px-4 pb-4 d-flex flex-column">
                    <div class="text-h6 font-weight-bold pb-2">&hellip;or Turn On Auto-bidding</div>
                    <div class="text-body-1">
                        Your price will automatically be set just high enough to win over currently highest's bidder
                        price, until you've hit maximum price you've set below.
                    </div>
                </v-row>
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

export default {
    name: "BidActionCard",
    components: { UsernameCard },
    data() {
        return {
            utils: { formatPrice },
            confirmDialogOpened: false,
            currentHighestBidPrice: 1499000,
            autoBidMaximumPrice: null,
            autoBidEnabled: false,
            priceIncrement: 100000,
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
        suggestedBidPrice() {
            return this.currentHighestBidPrice + this.priceIncrement;
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
    },
};
</script>

<style scoped>
.dialog-price-field >>> .v-input__prepend-outer,
.dialog-price-field >>> input {
    font-size: 2em;
}
</style>
