<template>
    <v-container class="ma-0 pa-0">
        <div class="text-h6 font-weight-bold">Description</div>
        <div class="pa-0 ma-0 mb-4" v-html="primaryDescription.description"></div>
        <v-card
            class="pa-4 mb-2"
            color="amber lighten-4"
            flat
            v-for="desc2 in secondaryDescriptions"
            :key="desc2.upload_date"
        >
            <div class="d-flex flex-row">
                <div class="mr-4">
                    <span class="font-weight-bold">Edit</span>
                </div>
                <div class="ml-4 d-flex flex-align-center">
                    <v-icon left small>mdi-clock-outline</v-icon>
                    <span>{{ utils.toLongTimestamp(desc2.upload_date) }}</span>
                </div>
            </div>
            <div class="mt-2">
                <div class="ma-0 pa-0" v-html="desc2.description"></div>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import { mapState } from "vuex";
import { toLongTimestamp } from "@/utils/timeUtils";

export default {
    name: "ProductDescription",
    props: {
        productId: String,
    },
    data() {
        return {
            utils: { toLongTimestamp },
            descriptions: [],
        };
    },
    computed: {
        ...mapState("CurrentProductModule", ["primaryDescription", "secondaryDescriptions"]),
    },
};
</script>
