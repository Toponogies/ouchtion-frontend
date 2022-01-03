<template>
    <div id="user-account-actions">
        <v-btn v-if="currentUserName === null" color="primary" large rounded @click="handleDialogOpen">
            Sign in / Sign up
        </v-btn>
        <v-menu v-else offset-y transition="scroll-y-transition">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text large rounded class="pr-0">
                    {{ currentUserName }}
                    <v-avatar color="primary" class="ml-4">
                        <v-icon v-if="currentUserAvatar === null" color="white">mdi-account-circle</v-icon>
                        <img v-else :src="currentUserAvatar" />
                    </v-avatar>
                </v-btn>
            </template>
            <v-list>
                <v-list-item-group>
                    <v-list-item v-if="currentUserRole === constants.ROLES.SELLER" to="/dashboard/s">
                        <v-list-item-icon><v-icon>mdi-store</v-icon></v-list-item-icon>
                        <v-list-item-title>My Products</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="currentUserRole === constants.ROLES.BIDDER" to="/dashboard/b">
                        <v-list-item-icon><v-icon>mdi-currency-usd</v-icon></v-list-item-icon>
                        <v-list-item-title>My Bids</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="currentUserRole === constants.ROLES.ADMIN" to="/dashboard/a">
                        <v-list-item-icon><v-icon>mdi-view-dashboard</v-icon></v-list-item-icon>
                        <v-list-item-title>Admin Dashboard</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="currentUserRole !== constants.ROLES.ADMIN" to="/profile">
                        <v-list-item-icon><v-icon>mdi-account-circle</v-icon></v-list-item-icon>
                        <v-list-item-title>My Profile</v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-icon><v-icon color="red">mdi-logout</v-icon></v-list-item-icon>
                        <v-list-item-title>
                            <span class="red--text">Log out</span>
                        </v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-menu>
        <v-dialog v-model="dialogOpened" max-width="640" persistent>
            <v-card>
                <v-row no-gutters>
                    <v-tabs fixed-tabs>
                        <v-tab>Sign in</v-tab>
                        <v-tab>Sign up</v-tab>
                        <v-btn icon large @click="handleDialogClose">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>

                        <v-tab-item>
                            <v-container class="pa-4">
                                <div>Sign in form</div>
                            </v-container>
                        </v-tab-item>
                        <v-tab-item>
                            <v-container class="pa-4">
                                <div>Sign up form</div>
                            </v-container>
                        </v-tab-item>
                    </v-tabs>
                </v-row>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import constants from "@/utils/constants";

export default {
    name: "UserAccountActions",
    data() {
        return {
            dialogOpened: false,
            currentUserName: null,
            currentUserAvatar: null,
            currentUserRole: null,
        };
    },
    created() {
        // https://stackoverflow.com/a/58900694
        this.constants = constants;
    },
    methods: {
        handleDialogOpen() {
            this.dialogOpened = true;
        },
        handleDialogClose() {
            this.dialogOpened = false;
        },
        handleLogin() {
            // Handle sign in
            this.dialogOpened = false;
        },
        handleSignup() {
            // Send & handle sign up request
            this.dialogOpened = false;
        },
        logOut() {
            this.currentUserName = null;
            this.currentUserAvatar = null;
            this.currentUserRole = null;
        },
    },
};
</script>
