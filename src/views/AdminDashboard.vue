<template>
    <v-container class="ma-0 pa-0">
        <v-card>
            <v-tabs grow>
                <!-- Tabs -->
                <v-tab>
                    <v-icon left>mdi-shape</v-icon>
                    <span>Categories</span>
                </v-tab>
                <v-tab>
                    <v-icon left>mdi-package-variant-closed</v-icon>
                    <span>Products</span>
                </v-tab>
                <v-tab>
                    <v-icon left>mdi-account-multiple</v-icon>
                    <span>Users</span>
                </v-tab>
                <v-tab>
                    <v-icon left>mdi-arrow-up-thick</v-icon>
                    <span>Upgrade Requests</span>
                </v-tab>

                <!-- Sub-views -->
                <v-tab-item>
                    <v-container class="pa-0">
                        <categories></categories>
                    </v-container>
                </v-tab-item>
                <v-tab-item>
                    <v-container class="pa-0">
                        <products></products>
                    </v-container>
                </v-tab-item>
                <v-tab-item>
                    <v-container class="pa-0">
                        <users></users>
                    </v-container>
                </v-tab-item>
                <v-tab-item>
                    <v-container class="pa-0">
                        <upgrade-requests></upgrade-requests>
                    </v-container>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-container>
</template>

<script>
import Categories from "@/views/admin/Categories";
import Products from "@/views/admin/Products";
import Users from "@/views/admin/Users";
import UpgradeRequests from "@/views/admin/UpgradeRequests";
import { redirectToHomeIf } from "@/utils/redirectToHomeIf";
import { ROLES, AUTH_REGISTER, USER_UPGRADE_REQUEST, AUTH_VERIFY, PRODUCT_ADD, PRODUCT_WON } from "@/utils/constants";
import { socket } from "@/socket/connect";

export default {
    name: "AdminDashboard",
    components: { Categories, Products, Users, UpgradeRequests },
    beforeCreate() {
        redirectToHomeIf(this, [ROLES.ADMIN]);
    },
    created() {
        socket.on(AUTH_REGISTER, () => {
            // Get all users again and update the list
        });

        socket.on(AUTH_VERIFY, () => {
            // Get all users again and update the list
        });

        socket.on(USER_UPGRADE_REQUEST, () => {
            // Get all request again and update the list
        });

        socket.on(PRODUCT_ADD, () => {
            // Get all products again and update the list
        });

        socket.on(PRODUCT_WON, () => {
            // Get all products again and update the list
        });
    },
};
</script>
