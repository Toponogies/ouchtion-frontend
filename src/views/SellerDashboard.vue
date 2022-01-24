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
import { PRODUCT_ADD, PRODUCT_DELETE, PRODUCT_WON, ROLES } from "@/utils/constants";
import { socket } from "@/socket/connect";

export default {
    name: "BidderDashboard",
    components: { OngoingProducts, SoldProducts },
    beforeCreate() {
        redirectToHomeIf(this, [ROLES.SELLER]);
    },
    created() {
        socket.on(PRODUCT_WON, (data) => {
            console.log(data.product_id);
            // Notify user and redirect to home
        });

        socket.on(PRODUCT_ADD, () => {
            // Get all products
        });

        socket.on(PRODUCT_DELETE, () => {
            // Get all products
        });
    },
};
</script>
