<template>
    <v-container class="ma-0 pa-0">
        <div class="text-h6 font-weight-bold">Description</div>
        <div class="pa-0 ma-0 mb-4" v-html="primaryDescription.description"></div>
        <v-card
            class="pa-4 mb-4"
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
        <v-row no-gutters class="mb-2" v-if="role === utils.ROLES.SELLER">
            <v-col>
                <v-spacer></v-spacer>
                <v-btn @click="handleAppendDescriptionBtnClick">
                    <v-icon left>mdi-pencil-plus</v-icon>
                    Append description
                </v-btn>
                <v-spacer></v-spacer>
            </v-col>
            <product-description-appending-modal></product-description-appending-modal>
        </v-row>
    </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { toLongTimestamp } from "@/utils/timeUtils";
import ProductDescriptionAppendingModal from "@/components/productDetails/ProductDescriptionAppendingModal";
import { ROLES } from "@/utils/constants";

export default {
    name: "ProductDescription",
    components: { ProductDescriptionAppendingModal },
    data() {
        return {
            utils: { toLongTimestamp, ROLES },
            descriptions: [],
        };
    },
    computed: {
        ...mapState("CurrentProductModule", ["primaryDescription", "secondaryDescriptions"]),
        ...mapState("CurrentUserModule", ["role"]),
    },
    methods: {
        ...mapMutations("CurrentProductModule", ["setAppendDescriptionModalState"]),
        handleAppendDescriptionBtnClick() {
            this.setAppendDescriptionModalState(true);
        },
    },
};
</script>

<style scoped>
/* Blockquote for description */
blockquote {
    border-left: 0.25em solid #dfe2e5;
    color: #6a737d;
    padding-left: 1em;
    margin: 20px 0 !important;
}
</style>
