<template>
    <v-container class="ma-0 pa-0">
        <v-card>
            <v-tabs grow>
                <!-- Tabs -->
                <v-tab>
                    <v-icon left>mdi-bookmark-multiple</v-icon>
                    <span>Watchlist</span>
                </v-tab>
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
                    <v-container class="pa-0">
                        <watchlist></watchlist>
                    </v-container>
                </v-tab-item>
                <v-tab-item>
                    <v-container class="pa-0">
                        <ongoing-bids></ongoing-bids>
                    </v-container>
                </v-tab-item>
                <v-tab-item>
                    <v-container class="pa-0">
                        <completed-bids></completed-bids>
                    </v-container>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-container>
</template>

<script>
import Watchlist from "@/views/bidder/Watchlist";
import OngoingBids from "@/views/bidder/OngoingBids";
import CompletedBids from "@/views/bidder/CompletedBids";
import { redirectToHomeIf } from "@/utils/redirectToHomeIf";
import {
    ROLES,
    PRODUCT_ADD_WATCHLIST,
    PRODUCT_DELETE_WATCHLIST,
    BIDDING_ADD,
    BIDDING_ADD_AUTO,
    PRODUCT_WON,
} from "@/utils/constants";
import { socket } from "@/socket/connect";

export default {
    name: "BidderDashboard",
    components: { Watchlist, OngoingBids, CompletedBids },
    beforeCreate() {
        redirectToHomeIf(this, [ROLES.BIDDER]);
    },
    created() {
        socket.on(PRODUCT_ADD_WATCHLIST, () => {
            // Get all watchlist again and update the list
        });

        socket.on(PRODUCT_DELETE_WATCHLIST, () => {
            // Get all watchlist again and update the list
        });

        socket.on(BIDDING_ADD, () => {
            // Get all ongoing bid again and update the list
        });

        socket.on(BIDDING_ADD_AUTO, () => {
            // Get all ongoing bid and update the list
        });

        socket.on(PRODUCT_WON, () => {
            // Get all completed bids and update the list
        });
    },
};
</script>
