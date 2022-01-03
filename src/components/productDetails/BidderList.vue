<template>
    <v-container class="ma-0 pa-0">
        <div class="text-h6 font-weight-bold">68 also bidding</div>
        <v-card class="mt-3" flat outlined>
            <v-data-table :headers="tableHeaders" :items="tableValues" :items-per-page="5"></v-data-table>
        </v-card>
    </v-container>
    <!-- <v-expansion-panels accordion multiple v-model="expandedPanels">
        <v-expansion-panel>
            <v-expansion-panel-header></v-expansion-panel-header>
            <v-expansion-panel-content> </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels> -->
</template>

<script>
export default {
    name: "BidderList",
    data() {
        return {
            expandedPanels: [0],
            tableHeaders: [
                { text: "Time", value: "time" },
                { text: "Bidder", value: "bidder", sortable: false },
                { text: "Price", value: "price" },
            ],
            tableValues: [
                { time: "timestamp", bidder: "username1", price: 100000 },
                { time: "timestamp", bidder: "username2", price: 200000 },
                { time: "timestamp", bidder: "username3", price: 300000 },
                { time: "timestamp", bidder: "username4", price: 400000 },
                { time: "timestamp", bidder: "username5", price: 500000 },
                { time: "timestamp", bidder: "username6", price: 600000 },
                { time: "timestamp", bidder: "username7", price: 700000 },
                { time: "timestamp", bidder: "username8", price: 800000 },
                { time: "timestamp", bidder: "username9", price: 900000 },
                { time: "timestamp", bidder: "username10", price: 1000000 },
                { time: "timestamp", bidder: "username11", price: 1100000 },
                { time: "timestamp", bidder: "username11", price: 1200000 },
            ],
        };
    },
};
</script>
