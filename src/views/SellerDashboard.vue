<template>
    <v-container class="ma-0 pa-0">
        <v-card>
            <v-tabs grow>
                <!-- Tabs -->
                <v-tab>
                    <v-icon left>mdi-timer-sand-empty</v-icon>
                    <span>Ongoing Products</span>
                </v-tab>
                <v-tab>
                    <v-icon left>mdi-checkbox-marked</v-icon>
                    <span>Sold Products</span>
                </v-tab>

                <!-- Sub-views -->
                <v-tab-item>
                    <v-container class="pa-0">
                        <ongoing-products></ongoing-products>
                    </v-container>
                </v-tab-item>
                <v-tab-item>
                    <v-container class="pa-0">
                        <sold-products></sold-products>
                    </v-container>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-container>
</template>

<script>
import { redirectToHomeIf } from "@/utils/redirectToHomeIf";

import OngoingProducts from "@/views/seller/OngoingProducts";
import SoldProducts from "@/views/seller/SoldProducts";
import { PRODUCT_ADD, PRODUCT_DELETE, PRODUCT_WON, ROLES, USER_RATE } from "@/utils/constants";
import { socket } from "@/socket/connect";

import { mapActions, mapState } from "vuex";

export default {
    name: "BidderDashboard",
    components: { OngoingProducts, SoldProducts },
    beforeCreate() {
        redirectToHomeIf(this, [ROLES.SELLER]);
    },
    computed: {
        ...mapState("CurrentUserModule", ["id", "role"]),
    },
    methods: {
        ...mapActions("ProductModule", ["fetchOngoing", "fetchCompleted"]),
    },
    created() {
        socket.on(PRODUCT_WON, (data) => {
            // Notify user and redirect to home
            if (data.user_id == this.id) {
                this.fetchOngoing();
                this.fetchCompleted();
            }
        });

        socket.on(PRODUCT_ADD, (data) => {
            // Get all products
            if (data.user_id == this.id) {
                this.fetchOngoing();
                this.fetchCompleted();
            }
        });

        socket.on(PRODUCT_DELETE, (data) => {
            // Get all products
            if (data.user_id == this.id) {
                this.fetchOngoing();
                this.fetchCompleted();
            }
        });

        socket.on(USER_RATE, (data) => {
            // Get all ongoing bid and update the list
            console.log(data);
            if (data.seller_id == this.id) {
                this.fetchOngoing();
                this.fetchCompleted();
            }
        });
    },
};
</script>
