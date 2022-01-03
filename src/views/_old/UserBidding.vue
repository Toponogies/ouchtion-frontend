<template>
    <div>
        <v-data-table :headers="headers" :items="bidings" disable-pagination :hide-default-footer="true">
        </v-data-table>
    </div>
</template>

<script>
export default {
    name: "Bidding",
    data() {
        return {
            bidings: [
                {
                    bidding_id: 1,
                    user_id: 1,
                    product_id: 1,
                    bid_price: 100,
                    max_price: 200,
                    time: "2020-01-05 14:15:18",
                },
                {
                    bidding_id: 2,
                    user_id: 1,
                    product_id: 1,
                    bid_price: 100,
                    max_price: 200,
                    time: "2020-01-05 14:15:18",
                },
                {
                    bidding_id: 3,
                    user_id: 1,
                    product_id: 1,
                    bid_price: 100,
                    max_price: 200,
                    time: "2020-01-05 14:15:18",
                },
                {
                    bidding_id: 4,
                    user_id: 1,
                    product_id: 1,
                    bid_price: 100,
                    max_price: 200,
                    time: "2020-01-05 14:15:18",
                },
            ],
            title: "",
            headers: [
                { text: "Id", value: "bidding_id", align: "start", sortable: false },
                { text: "User id", value: "user_id", sortable: false },
                { text: "Product id", value: "product_id", sortable: false },
                { text: "Bid price", value: "bid_price", sortable: false },
                { text: "Max price", value: "max_price", sortable: false },
                { text: "Time", value: "time", sortable: false },
            ],
        };
    },
};
</script>
