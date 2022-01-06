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
import { getProductBidding } from "@/api/product";
import { toLongTimestamp } from "@/utils/timeUtils";
import { hiddenName } from "@/utils/hiddenName";

export default {
    name: "BidderList",
    props: {
        productId: String,
    },
    data() {
        return {
            utils: { toLongTimestamp, hiddenName },
            consts: { ROLES },
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
        async getBidderList() {
            try{
                this.bidderList = await getProductBidding(this.productId);
                this.bidderList.forEach(bidder => {
                    bidder.time = this.utils.toLongTimestamp(bidder.time);
                    bidder.full_name = this.utils.hiddenName(bidder.full_name);
                });
            }
            catch(error){
                console.log(error);
            }
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
