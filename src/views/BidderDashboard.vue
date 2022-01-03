<template>
    <v-container class="ma-0 pa-0">
        <v-card>
            <v-tabs fixed-tabs>
                <!-- Tabs -->
                <v-tab>
                    <v-icon left>mdi-timer-sand-empty</v-icon>
                    <span>Ongoing Bids</span>
                </v-tab>
                <v-tab>
                    <v-icon left>mdi-checkbox-marked</v-icon>
                    <span>Completed Bids</span>
                </v-tab>

                <!-- Sub-views -->
                <v-tab-item>
                    <v-container class="pa-4">
                        <ongoing-bids></ongoing-bids>
                    </v-container>
                </v-tab-item>
                <v-tab-item>
                    <v-container class="pa-4">
                        <completed-bids></completed-bids>
                    </v-container>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-container>
</template>

<script>
import OngoingBids from "@/views/bidder/OngoingBids";
import CompletedBids from "@/views/bidder/CompletedBids";

export default {
    name: "BidderDashboard",
    components: { OngoingBids, CompletedBids },
};
</script>
