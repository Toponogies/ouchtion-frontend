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
                <template v-slot:[`item.actions`]="{ item }" v-if="role === utils.ROLES.SELLER && id === seller.id">
                    <v-btn text small @click.stop="blockBidder(item)" color="error">
                        <v-icon left>mdi-cancel</v-icon>
                        <span>Block</span>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
        };
    },
    computed: {
        ...mapState("CurrentProductModule", ["seller", "bid"]),
        ...mapState("CurrentUserModule", ["id", "role"]),
        bidderListCount: function () {
            return this.bid.biddings.length;
        },
        tableHeaders: function () {
            if (this.role === ROLES.SELLER && this.id === this.seller.id) {
                return [...this.local_tableHeaders, ...this.local_tableHeadersAction];
            } else {
                return [...this.local_tableHeaders];
            }
        },
    },
    methods: {
        ...mapActions("CurrentProductModule", ["removeAndBlockBidder"]),

        blockBidder(item) {
            this.removeAndBlockBidder(item.bidding_id);
        },
    },
};
</script>
