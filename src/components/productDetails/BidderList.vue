<template>
    <v-container class="ma-0 pa-0">
        <div class="text-h6 font-weight-bold">{{ bidderListCount }} also bidding</div>
        <v-card class="mt-3" flat outlined>
            <v-data-table :headers="tableHeaders" :items="bidderList" :items-per-page="5">
                <template v-slot:[`item.actions`]="{ item }" v-if="userCurrentRole === consts.ROLES.SELLER">
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
import { ROLES } from "@/utils/constants";

export default {
    name: "BidderList",
    props: {
        productId: String,
    },
    data() {
        return {
            consts: { ROLES },
            expandedPanels: [0],
            local_tableHeaders: [
                { text: "Time", value: "time" },
                { text: "Bidder", value: "bidder", sortable: false },
                { text: "Price", value: "price" },
            ],
            local_tableHeadersAction: [{ text: "Actions", value: "actions", sortable: false, align: "right" }],
            bidderList: [],
            userCurrentRole: null,
        };
    },
    computed: {
        bidderListCount: function () {
            return this.bidderList.length;
        },
        tableHeaders: function () {
            if (this.userCurrentRole === ROLES.SELLER) {
                return [...this.local_tableHeaders, ...this.local_tableHeadersAction];
            } else {
                return [...this.local_tableHeaders];
            }
        },
    },
    methods: {
        getBidderList() {
            this.bidderList = [
                { id: 1, time: "timestamp", bidder: "username1", price: 100000 },
                { id: 2, time: "timestamp", bidder: "username2", price: 200000 },
                { id: 3, time: "timestamp", bidder: "username3", price: 300000 },
                { id: 4, time: "timestamp", bidder: "username4", price: 400000 },
                { id: 5, time: "timestamp", bidder: "username5", price: 500000 },
                { id: 6, time: "timestamp", bidder: "username6", price: 600000 },
                { id: 7, time: "timestamp", bidder: "username7", price: 700000 },
                { id: 8, time: "timestamp", bidder: "username8", price: 800000 },
                { id: 9, time: "timestamp", bidder: "username9", price: 900000 },
                { id: 10, time: "timestamp", bidder: "username10", price: 1000000 },
                { id: 11, time: "timestamp", bidder: "username11", price: 1100000 },
                { id: 12, time: "timestamp", bidder: "username11", price: 1200000 },
            ];
        },
        acceptBid(item) {
            console.log(`Accept bid id = ${item.id}`);
            this.getBidderList();
        },
        rejectBid(item) {
            console.log(`Reject bid id = ${item.id}`);
            this.getBidderList();
        },
    },
    mounted() {
        this.getBidderList();
    },
};
</script>
