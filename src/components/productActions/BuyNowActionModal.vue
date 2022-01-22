<template>
    <v-dialog max-width="640" v-model="buyNow.isModalOpen" persistent>
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
                    <username-card :username="username" :rating="rating"></username-card>
                </v-col>
                <v-col cols="6">
                    <v-text-field
                        class="dialog-price-field"
                        outlined
                        disabled
                        :value="utils.formatPrice(buyNow.price)"
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
                <v-btn color="red darken-3 white--text" @click="handleConfirmDialogOK" large> Confirm Purchase </v-btn>
                <v-spacer></v-spacer>
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import UsernameCard from "@/components/productDetails/UsernameCard";
import { formatPrice } from "@/utils/priceUtils";

export default {
    name: "BuyNowActionModal",
    components: { UsernameCard },
    data() {
        return {
            utils: { formatPrice },
        };
    },
    computed: {
        ...mapState("CurrentProductModule", ["buyNow"]),
        ...mapState("CurrentUserModule", ["username", "rating"]),
    },
    methods: {
        ...mapMutations("CurrentProductModule", ["setBuyNowModalState"]),
        ...mapActions("CurrentProductModule", ["buyProduct"]),
        handleConfirmDialogOK() {
            this.buyProduct({
                product_id: this.$route.params.id,
            })
            // TRIGGER: BUY THIS PRODUCT
            this.setBuyNowModalState(false);
        },
        handleConfirmDialogCancel() {
            this.setBuyNowModalState(false);
        },
    },
};
</script>
