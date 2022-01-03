<template>
    <v-container class="ma-0 pa-0">
        <div class="text-h6 font-weight-bold">Description</div>
        <p class="pa-0 ma-0 mb-4">Description goes here</p>
        <v-card class="pa-4" color="amber lighten-4" flat>
            <div class="d-flex flex-row mb-2">
                <div class="mr-4">
                    <span class="font-weight-bold">Edit #1</span>
                </div>
                <div class="ml-4 d-flex flex-align-center">
                    <v-icon left small>mdi-clock-outline</v-icon>
                    <span>Update time</span>
                </div>
            </div>
            <div class="mt-2">
                <p class="ma-0 pa-0">Description appendix #1 goes here</p>
            </div>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "ProductDescription",
    props: {
        description: String,
        appendices: Array,
    },
    data() {
        return {
            expandedPanels: [0],
        };
    },
};
</script>
