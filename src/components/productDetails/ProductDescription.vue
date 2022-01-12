<template>
    <v-container class="ma-0 pa-0">
        <div class="text-h6 font-weight-bold">Description</div>
        <div class="pa-0 ma-0 mb-4" v-html="primaryDescription.description"></div>
        <v-card class="pa-4 mb-2" color="amber lighten-4" flat v-for="appendix in appendices" :key="appendix.upload_date">
            <div class="d-flex flex-row">
                <div class="mr-4">
                    <span class="font-weight-bold">Edit</span>
                </div>
                <div class="ml-4 d-flex flex-align-center">
                    <v-icon left small>mdi-clock-outline</v-icon>
                    <span>{{ utils.toLongTimestamp(appendix.upload_date) }}</span>
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

import { getProductDescription } from "@/api/product";

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
        async getProductDescriptions() {
            this.descriptions = await getProductDescription(this.productId)
            var isInit = false;
            this.descriptions.forEach(description => {
                if (isInit === false)
                {
                    description.isInit = 1;
                    isInit = true
                }
                else
                {
                    description.isInit = 0;
                }
            });
        },
    },
    mounted() {
        this.getProductDescriptions();
    },
};
</script>
