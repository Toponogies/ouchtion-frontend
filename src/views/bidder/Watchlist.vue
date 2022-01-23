<template>
    <v-data-table
        :loading="isLoading"
        loading-text="Loading data"
        :headers="headers"
        :items="items"
        :items-per-page="15"
    >
        <!-- Column: Image -->
        <template v-slot:[`item.primaryImage`]="{ item }">
            <v-img :src="item.primaryImage" max-width="64"></v-img>
        </template>

        <!-- Column: End time -->
        <template v-slot:[`item.endTime`]="{ item }">
            <span>{{ utils.toLongTimestamp(item.endTime) }}</span>
        </template>

        <!-- Column: Price -->
        <template v-slot:[`item.highestBidPrice`]="{ item }">
            <span>{{ utils.formatPrice(item.highestBidPrice) }}</span>
        </template>

        <!-- Column: Action buttons -->
        <template v-slot:[`item.actions`]="{ item }">
            <!-- Button with tooltip: remove this item from watchlist -->
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon @click="removeFromWatchlist(item)" v-on="on" v-bind="attrs">
                        <v-icon>mdi-bookmark-remove</v-icon>
                    </v-btn>
                </template>
                <span>Remove from watchlist</span>
            </v-tooltip>

            <!-- Button with tooltip: Go to product details page of this item -->
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon @click="goToItem(item)" v-on="on" v-bind="attrs">
                        <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                </template>
                <span>Go to item</span>
            </v-tooltip>
        </template>
    </v-data-table>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { toLongTimestamp } from "@/utils/timeUtils";
import { formatPrice } from "@/utils/priceUtils";

export default {
    name: "Watchlist",
    data() {
        return {
            utils: { toLongTimestamp, formatPrice },
        };
    },
    computed: {
        ...mapState("BidderWatchlistModule", ["isLoading", "headers", "items"]),
    },
    methods: {
        ...mapActions("BidderWatchlistModule", ["getItems", "remove"]),
        goToItem(item) {
            const nextPath = `/p/${item.id}`;
            if (this.$router.currentRoute.fullPath !== nextPath) {
                this.$router.push(nextPath);
            }
        },
        removeFromWatchlist(item) {
            this.remove(item.id);
        },
    },
    mounted() {
        this.getItems();
    },
};
</script>
