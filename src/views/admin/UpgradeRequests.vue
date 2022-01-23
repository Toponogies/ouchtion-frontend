<template>
    <v-data-table
        :loading="isLoading"
        loading-text="Loading data"
        :headers="headers"
        :items="items"
        :items-per-page="-1"
        :item-key="'userId'"
        show-expand
        single-expand
        :expanded.sync="expandedRows"
    >
        <!-- Column: Dummy avatar -->
        <template v-slot:[`item.dummyAvatar`]="{}">
            <v-avatar color="primary" size="36">
                <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
        </template>

        <!-- Expanded row -->
        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
                <v-container>
                    <!-- Requested at time -->
                    <v-row no-gutters class="py-2" align="center">
                        <v-col cols="2"><span class="text-overline">Time</span></v-col>
                        <v-col cols="10">{{ utils.toLongTimestamp(item.time) }}</v-col>
                    </v-row>

                    <!-- Reason -->
                    <v-row no-gutters class="py-2" align="center">
                        <v-col cols="2"><span class="text-overline">Reason</span></v-col>
                        <v-col cols="10">{{ item.reason }}</v-col>
                    </v-row>

                    <!-- Action button -->
                    <v-row no-gutters class="py-2" align="center">
                        <v-col cols="2"></v-col>
                        <v-col cols="10">
                            <v-btn class="mr-4" @click="acceptUserRequest(item)">
                                <v-icon left color="success">mdi-check</v-icon>
                                <span class="success--text">Accept</span>
                            </v-btn>
                            <v-btn class="mr-4" @click="rejectUserRequest(item)">
                                <v-icon left color="error">mdi-close</v-icon>
                                <span class="error--text">Reject</span>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </td>
        </template>
    </v-data-table>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { toLongTimestamp } from "@/utils/timeUtils";

export default {
    name: "Products",
    data() {
        return {
            utils: { toLongTimestamp },
            expandedRows: [],
        };
    },
    computed: {
        ...mapState("AdminUpgradeRequestsDashboardModule", ["isLoading", "headers", "items"]),
    },
    methods: {
        ...mapActions("AdminUpgradeRequestsDashboardModule", ["getItems", "accept", "reject"]),
        acceptUserRequest(item) {
            this.accept(item.userId);
        },
        rejectUserRequest(item) {
            this.reject(item.userId);
        },
    },
    mounted() {
        this.getItems();
    },
};
</script>
