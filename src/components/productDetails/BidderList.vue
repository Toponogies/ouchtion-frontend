<template>
    <v-container class="ma-0 pa-0">
        <div class="text-h6 font-weight-bold">{{ bidderListCount }} biddings</div>
        <v-card class="mt-3" flat outlined>
            <v-data-table :headers="tableHeaders" :items="bid.biddings" :items-per-page="5">
                <!-- Price -->
                <template v-slot:[`item.bid_price`]="{ item }">
                    <span>&#x20AB; {{ utils.formatPrice(item.bid_price) }}</span>
                </template>

                <!-- Actions (only shown to sellers) -->
                <template v-slot:[`item.actions`]="{ item }" v-if="userCurrentRole === utils.ROLES.SELLER">
                    <v-btn text small @click="acceptBid(item)" color="success">
                        <v-icon left>mdi-check</v-icon>
                        <span>Accept</span>
                    </v-btn>
                    <v-btn text small @click="rejectBid(item)" color="error">
                        <v-icon left>mdi-close</v-icon>
                        <span>Reject</span>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
import { mapState } from "vuex";
import { ROLES } from "@/utils/constants";
import { formatPrice } from "@/utils/priceUtils";

export default {
    name: "BidderList",
    data() {
        return {
            utils: { ROLES, formatPrice },
            expandedPanels: [0],
            local_tableHeaders: [
                { text: "Time", value: "time" },
                { text: "Bidder", value: "full_name", sortable: false },
                { text: "Price", value: "bid_price" },
            ],
            local_tableHeadersAction: [{ text: "Actions", value: "actions", sortable: false, align: "right" }],
            bidderList: [],
            userCurrentRole: null,
        };
    },
    computed: {
        ...mapState("CurrentProductModule", ["bid"]),
        bidderListCount: function () {
            return this.bid.biddings.length;
        },
        tableHeaders: function () {
            if (this.userCurrentRole === ROLES.SELLER) {
                return [...this.local_tableHeaders, ...this.local_tableHeadersAction];
            } else {
                return [...this.local_tableHeaders];
            }
        },
    },
};
</script>
