<template>
    <v-card @click="handleConfirmDialogOpen" :color="cardColor" elevation="4" :disabled="!isBuyNowOptionAvailable">
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
        <v-dialog max-width="640" v-model="confirmDialogOpened" persistent>
            <v-card>
                <v-row no-gutters class="px-4 py-4">
                    <div class="text-h6 font-weight-bold">Confirm Your Purchase</div>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="handleConfirmDialogCancel">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-row>
                <v-row no-gutters class="px-4 pb-4 d-flex flex-column">
                    <div class="text-body-1">You will skip all the biddings and immediately buy this product.</div>
                </v-row>
                <v-row no-gutters cols="12" class="px-4 pb-4">
                    <v-col cols="6">
                        <username-card :username="myUsername" :rating="myRating"></username-card>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            class="dialog-price-field"
                            outlined
                            disabled
                            :value="formattedPrice"
                            :hint="'Buy-Now price'"
                            persistent-hint
                        >
                            <template v-slot:prepend>
                                <div>&#x20AB;</div>
                            </template>
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row no-gutters class="px-4 pb-4">
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-3 white--text" @click="handleConfirmDialogOK" large>
                        Confirm Purchase
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
    name: "BuyNowActionCard",
    components: { UsernameCard },
    props: {
        price: Number,
        myUsername: String,
        myRating: Number,
    },
    data() {
        return {
            utils: { formatPrice },
            confirmDialogOpened: false,
        };
    },
    computed: {
        isBuyNowOptionAvailable: function () {
            return this.price !== null;
        },
        cardColor: function () {
            return this.isBuyNowOptionAvailable ? "red darken-3 white--text" : "grey darken-3 white--text";
        },
        formattedPrice: function () {
            return this.isBuyNowOptionAvailable ? this.utils.formatPrice(this.price) : "Not applicable";
        },
    },
    methods: {
        handleConfirmDialogOpen() {
            this.confirmDialogOpened = true;
        },
        handleConfirmDialogOK() {
            this.confirmDialogOpened = false;
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
