<template>
    <div id="user-account-actions">
        <v-btn v-if="username === null" color="primary" large rounded @click="handleDialogOpen">
            Sign in / Sign up
        </v-btn>
        <v-menu v-else offset-y transition="scroll-y-transition">
            <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" text large rounded class="pr-0">
                    {{ username }}
                    <v-avatar color="primary" class="ml-4">
                        <v-icon v-if="currentUserAvatar === null" color="white">mdi-account-circle</v-icon>
                        <img v-else :src="currentUserAvatar" />
                    </v-avatar>
                </v-btn>
            </template>
            <v-list>
                <v-list-item-group>
                    <v-list-item v-if="role === consts.ROLES.SELLER" to="/dashboard/s">
                        <v-list-item-icon><v-icon>mdi-store</v-icon></v-list-item-icon>
                        <v-list-item-title>My Products</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="role === consts.ROLES.SELLER" to="/dashboard/s/new">
                        <v-list-item-icon><v-icon>mdi-plus-box</v-icon></v-list-item-icon>
                        <v-list-item-title>Add new product</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="role === consts.ROLES.BIDDER" to="/dashboard/b">
                        <v-list-item-icon><v-icon>mdi-currency-usd</v-icon></v-list-item-icon>
                        <v-list-item-title>My Bids</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="role === consts.ROLES.ADMIN" to="/dashboard/a">
                        <v-list-item-icon><v-icon>mdi-view-dashboard</v-icon></v-list-item-icon>
                        <v-list-item-title>Admin Dashboard</v-list-item-title>
                    </v-list-item>
                    <v-list-item v-if="role !== consts.ROLES.ADMIN" to="/profile">
                        <v-list-item-icon><v-icon>mdi-account-circle</v-icon></v-list-item-icon>
                        <v-list-item-title>My Profile</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="logOut">
                        <v-list-item-icon><v-icon color="red">mdi-logout</v-icon></v-list-item-icon>
                        <v-list-item-title>
                            <span class="red--text">Log out</span>
                        </v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-menu>
        <sign-in-up-modal></sign-in-up-modal>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { ROLES } from "@/utils/constants";
import SignInUpModal from "@/components/signinForm/SignInUpModal";

export default {
    name: "UserAccountActions",
    components: { SignInUpModal },
    data() {
        return {
            consts: { ROLES },
            dialogOpened: false,
            currentUserAvatar: null,
        };
    },
    computed: {
        ...mapState("CurrentUserModule", ["username", "rating", "role"]),
    },
    methods: {
        ...mapMutations("AuthModule", ["setModalState"]),
        ...mapActions("AuthModule", ["fetchAccessToken", "doLogout"]),
        handleDialogOpen() {
            this.setModalState(true);
        },
        async fetchCurrentUser() {
            await this.fetchAccessToken();
        },
        async logOut() {
            // Log out, then redirect back to home
            await this.doLogout();
            this.$router.push({ name: "Home" });
        },
    },
    mounted() {
        this.fetchCurrentUser();
    },
};
</script>
