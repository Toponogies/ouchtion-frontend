<template>
    <div id="user-account-actions">
        <v-btn v-if="currentUserName === null" color="primary" large rounded>Sign in / Sign up</v-btn>
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
                    <v-list-item v-if="currentUserRole === constants.ROLES.SELLER">
                        <v-list-item-icon><v-icon>mdi-store</v-icon></v-list-item-icon>
                        <v-list-item-title>My Products</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="currentUserRole === constants.ROLES.BIDDER">
                        <v-list-item-icon><v-icon>mdi-currency-usd</v-icon></v-list-item-icon>
                        <v-list-item-title>My Bids</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="currentUserRole === constants.ROLES.ADMIN">
                        <v-list-item-icon><v-icon>mdi-store</v-icon></v-list-item-icon>
                        <v-list-item-title>Manage products</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="currentUserRole === constants.ROLES.ADMIN">
                        <v-list-item-icon><v-icon>mdi-shape</v-icon></v-list-item-icon>
                        <v-list-item-title>Manage categories</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="currentUserRole === constants.ROLES.ADMIN">
                        <v-list-item-icon><v-icon>mdi-account-multiple</v-icon></v-list-item-icon>
                        <v-list-item-title>Manage users</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="currentUserRole !== constants.ROLES.ADMIN">
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
    </div>
</template>

<script>
import constants from "@/utils/constants";

export default {
    name: "UserAccountActions",
    data() {
        return {
            currentUserName: null,
            currentUserAvatar: null,
            currentUserRole: null,
        };
    },
    created() {
        // https://stackoverflow.com/a/58900694
        this.constants = constants;
    },
};
</script>
