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
                    <v-container class="pa-4">
                        <ongoing-products></ongoing-products>
                    </v-container>
                </v-tab-item>
                <v-tab-item>
                    <v-container class="pa-4">
                        <sold-products></sold-products>
                    </v-container>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-container>
</template>

<script>
import OngoingProducts from "@/views/seller/OngoingProducts";
import SoldProducts from "@/views/seller/SoldProducts";

export default {
    name: "BidderDashboard",
    components: { OngoingProducts, SoldProducts },
};
</script>
