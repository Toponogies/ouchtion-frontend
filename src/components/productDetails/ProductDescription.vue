<template>
    <v-container class="ma-0 pa-0">
        <div class="text-h6 font-weight-bold">Description</div>
        <div class="pa-0 ma-0 mb-4" v-html="primaryDescription.description"></div>
        <v-card class="pa-4 mb-2" color="amber lighten-4" flat v-for="appendix in appendices" :key="appendix.time">
            <div class="d-flex flex-row">
                <div class="mr-4">
                    <span class="font-weight-bold">Edit</span>
                </div>
                <div class="ml-4 d-flex flex-align-center">
                    <v-icon left small>mdi-clock-outline</v-icon>
                    <span>{{ utils.toLongTimestamp(appendix.time) }}</span>
                </div>
            </div>
            <div class="mt-2">
                <div class="ma-0 pa-0" v-html="appendix.description"></div>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import { find } from "lodash-es";
import { toLongTimestamp } from "@/utils/timeUtils";

export default {
    name: "ProductDescription",
    props: {
        productId: String,
    },
    data() {
        return {
            utils: { toLongTimestamp },
            expandedPanels: [0],
            descriptions: [],
        };
    },
    computed: {
        primaryDescription: function () {
            return find(this.descriptions, { isInit: 1 });
        },
        appendices: function () {
            return this.descriptions.filter((each) => each.isInit !== 1);
        },
    },
    methods: {
        getProductDescriptions() {
            this.descriptions = [
                {
                    time: "2021-01-04 12:00:00",
                    description: "First description<br><p><b>Hello</b> world</p>",
                    isInit: 1,
                },
                { time: "2021-01-04 12:00:00", description: "<p><i>Update</i> 1</p>", isInit: 0 },
                { time: "2021-01-04 12:00:00", description: "<p><i>Update</i> 2</p>", isInit: 0 },
            ];
        },
    },
    mounted() {
        this.getProductDescriptions();
    },
};
</script>
