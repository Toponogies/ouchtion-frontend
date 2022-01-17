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
                    <v-icon left>mdi-package-up</v-icon>
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
                    <v-container class="pa-4">
                        <categories></categories>
                    </v-container>
                </v-tab-item>
                <v-tab-item>
                    <v-container class="pa-4">
                        <products></products>
                    </v-container>
                </v-tab-item>
                <v-tab-item>
                    <v-container class="pa-4">
                        <users></users>
                    </v-container>
                </v-tab-item>
                <v-tab-item>
                    <v-container class="pa-4">
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

export default {
    name: "AdminDashboard",
    components: { Categories, Products, Users, UpgradeRequests },
};
</script>
