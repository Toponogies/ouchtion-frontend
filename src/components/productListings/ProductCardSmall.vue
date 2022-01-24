<template>
    <v-card tile elevation="4" @click="handleProductClick">
        <v-img :src="image" height="200">
            <template v-slot:placeholder>
                <v-row class="fill-height ma=0" align="center" justify="center">
                    <v-progress-circular indeterminate></v-progress-circular>
                </v-row>
            </template>
        </v-img>
        <v-card-title>
            <div class="text-subtitle-1 font-weight-medium" style="height: 56px !important" v-line-clamp="2">
                {{ title }}
            </div>
        </v-card-title>
        <v-card-text>
            <v-row class="my-n5">
                <v-col>
                    <span class="text-h6 orange--text font-weight-bold"> &#x20AB; {{ formattedBidHighestPrice }} </span>
                </v-col>
            </v-row>
            <v-row class="my-n3">
                <v-col>
                    <span>{{ bidderCount }} bidding</span>
                </v-col>
            </v-row>
        </v-card-text>
        <v-divider v-show="!highlightEndTime"></v-divider>
        <v-card tile elevation="0" :color="highlightEndTimeClass.bgColor" :dark="highlightEndTimeClass.isDark">
            <v-row class="ma-1">
                <v-col>
                    <span>Ends in {{ formattedEndTime }}</span>
                </v-col>
            </v-row>
        </v-card>
    </v-card>
</template>

<script>
import { formatPrice } from "@/utils/priceUtils";
import { toRelativeTimestamp, isInCountdownThreshold } from "@/utils/timeUtils";

export default {
    name: "ProductCardSmall",
    props: {
        id: [String, Number],
        image: String,
        title: String,
        bidderCount: Number,
        bidHighestPrice: Number,
        endTime: String,
        highlightEndTime: Boolean,
    },
    data() {
        return {
            formattedEndTime: toRelativeTimestamp(this.endTime),
        };
    },
    computed: {
        formattedBidHighestPrice: function () {
            return formatPrice(this.bidHighestPrice);
        },
        highlightEndTimeClass: function () {
            return {
                isDark: this.highlightEndTime,
                bgColor: this.highlightEndTime ? "red" : "",
            };
        },
    },
    methods: {
        _refreshEndTime() {
            this.formattedEndTime = toRelativeTimestamp(this.endTime);
            setTimeout(this._refreshEndTime, 1000);
        },
        handleProductClick() {
            const nextPath = `/p/${this.id}`;
            if (this.$router.currentRoute.fullPath !== nextPath) {
                this.$router.push(nextPath);
            }
        },
    },
    mounted() {
        if (isInCountdownThreshold(this.endTime)) {
            this._refreshEndTime();
        }
    },
};
</script>
