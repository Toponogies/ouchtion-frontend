<template>
    <v-dialog max-width="640" v-model="request.isModalOpen" persistent>
        <v-card>
            <!-- Header -->
            <v-row no-gutters class="px-4 py-4">
                <div class="text-h6 font-weight-bold">Send a Bidding Request</div>
                <v-spacer></v-spacer>
                <v-btn icon @click="handleConfirmDialogCancel">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-row>

            <!-- Hint -->
            <v-row no-gutters cols="12" class="px-4 pb-4">
                <v-col>
                    You are blocked from bidding directly on this product.<br />
                    To continue placing bids, send a request to the seller by pressing the button below and wait for
                    their approval.
                </v-col>
            </v-row>

            <!-- Confirm button -->
            <v-row no-gutters class="px-4 py-4">
                <v-spacer></v-spacer>
                <v-btn color="orange darken-3 white--text" @click="handleConfirmDialogOK" large> Send Request </v-btn>
                <v-spacer></v-spacer>
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
    name: "BidRequestModal",
    computed: {
        ...mapState("CurrentProductModule", ["request"]),
    },
    methods: {
        ...mapActions("CurrentProductModule", ["sendBidRequest"]),
        ...mapMutations("CurrentProductModule", ["setBidRequestModalState"]),

        async handleConfirmDialogOK() {
            await this.sendBidRequest();
            this.setBidRequestModalState(true);
        },
        handleConfirmDialogCancel() {
            this.setBidRequestModalState(false);
        },
    },
};
</script>
