<template>
    <v-dialog max-width="640" v-model="bid.isModalOpen" persistent>
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
                        :username="bid.highestUser.username"
                        :rating="bid.highestUser.rating"
                    ></username-card>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        class="dialog-price-field"
                        outlined
                        disabled
                        :value="utils.formatPrice(bid.highestPrice)"
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
            <v-row no-gutters cols="12" class="px-4 pb-4" v-if="!bid.isAutoBidEnabled">
                <v-col cols="6">
                    <username-card :username="currentUsername" :rating="currentRating"></username-card>
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
            <v-row no-gutters class="px-4" v-if="!bid.isAutoBidEnabled">
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
                    Your price will automatically be set just high enough to win over currently highest's bidder price,
                    until you've hit maximum price you've set below.
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
                            :disabled="bid.isAutoBidEnabled"
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
                    v-if="!bid.isAutoBidEnabled"
                >
                    Turn on Auto-bidding
                </v-btn>
                <v-btn color="orange--text text--darken-3" @click="handleConfirmDialogAutobidOff" large v-else>
                    Turn off Auto-bidding
                </v-btn>
                <v-spacer></v-spacer>
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import UsernameCard from "@/components/productDetails/UsernameCard";
import { formatPrice } from "@/utils/priceUtils";

export default {
    name: "BidActionModal",
    components: { UsernameCard },
    data() {
        return {
            utils: { formatPrice },
            autoBidMaximumPrice: null,
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
        ...mapState("CurrentProductModule", ["bid"]),
        ...mapGetters("CurrentProductModule", ["suggestedBidPrice"]),
        ...mapState("CurrentUserModule", {
            currentUsername: "username",
            currentRating: "rating",
        }),
    },
    methods: {
        ...mapMutations("CurrentProductModule", ["setBidModalState"]),
        ...mapActions("CurrentProductModule", ["addManualBid", "addAutoBidding", "turnOffAutoBidding"]),
        handleConfirmDialogOK() {
            this.addManualBid({
                product_id: this.$route.params.id,
                bid_price: this.newPrice,
            });
            this.setBidModalState(false);
        },
        handleConfirmDialogAutobidOK() {
            this.setBidModalState(false);
            this.addAutoBidding({
                product_id: this.$route.params.id,
                max_price: this.autoBidMaximumPrice,
            });
            // TRIGGER: ENABLE AUTO BID
            this.autoBidEnabled = true;
        },
        handleConfirmDialogAutobidOff() {
            this.setBidModalState(false);
            this.turnOffAutoBidding({
                product_id: this.$route.params.id,
            });
            // TRIGGER: DISABLE AUTO BID
            this.autoBidEnabled = false;
        },
        handleConfirmDialogCancel() {
            this.setBidModalState(false);
        },
    },
};
</script>
