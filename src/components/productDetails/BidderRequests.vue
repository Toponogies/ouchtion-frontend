<template>
    <v-container class="ma-0 pa-0" v-if="role === utils.ROLES.SELLER">
        <div class="text-h6 font-weight-bold">{{ bidderRequestCount }} pending requests</div>
        <!-- Placeholder (no requests) -->
        <v-card class="mt-3 pa-4" flat outlined v-if="bidderRequestCount === 0">
            <v-row no-gutters justify="center" align="center" class="d-flex flex-column">
                <v-icon large color="grey" class="mb-1">mdi-account-circle-outline</v-icon>
                <div class="grey--text mt-1">No requests</div>
            </v-row>
        </v-card>

        <!-- Table -->
        <v-card class="mt-3" flat outlined v-else :loading="bidRequests.isLoading">
            <v-data-table :headers="bidRequests.headers" :items="bidRequests.items" :items-per-page="5">
                <!-- Actions -->
                <template v-slot:[`item.actions`]="{ item }">
                    <v-btn text small @click="acceptRequest(item)" color="success">
                        <v-icon left>mdi-check</v-icon>
                        <span>Accept</span>
                    </v-btn>
                    <v-btn text small @click="rejectRequest(item)" color="error">
                        <v-icon left>mdi-close</v-icon>
                        <span>Reject</span>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { ROLES } from "@/utils/constants";

export default {
    name: "BidderList",
    data() {
        return {
            utils: { ROLES },
        };
    },

    computed: {
        ...mapState("CurrentProductDetailsSellerModule", ["bidRequests"]),
        ...mapState("CurrentUserModule", ["role"]),
        bidderRequestCount: function () {
            return this.bidRequests.items.length;
        },
    },

    methods: {
        ...mapActions("CurrentProductDetailsSellerModule", [
            "getBidderRequests",
            "acceptBidderRequest",
            "rejectBidderRequest",
        ]),
        async acceptRequest(item) {
            await this.acceptBidderRequest(item.requestId);
        },
        async rejectRequest(item) {
            await this.rejectBidderRequest(item.requestId);
        },
    },

    async mounted() {
        await this.getBidderRequests();
    },
};
</script>
