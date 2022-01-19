<template>
    <v-container class="ma-0 pa-0">
        <v-card class="pa-4">
            <v-row no-gutters>
                <!-- Fake avatar placeholder -->
                <v-col cols="4">
                    <v-row no-gutters justify="center">
                        <v-icon size="256">mdi-account-circle</v-icon>
                    </v-row>
                </v-col>

                <!-- Profile info -->
                <v-col cols="8" class="mt-6">
                    <!-- Name (normal) -->
                    <v-row no-gutters class="mb-4" v-if="!isInEditModeName">
                        <v-col cols="10">
                            <div class="text-h4 font-weight-light">{{ username }}</div>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="isInEditModeName = true">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </v-row>

                    <!-- Name (edit mode) -->
                    <v-row no-gutters class="mb-4" v-else align="center">
                        <v-col cols="10">
                            <v-text-field
                                filled
                                class="name-field"
                                hide-details="auto"
                                placeholder="Username"
                                v-model="username_edit"
                            ></v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-btn icon color="error" @click="editNameCancel">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-btn icon color="success" @click="editNameOK">
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                    </v-row>

                    <!-- Email (normal) -->
                    <v-row no-gutters class="mb-4" align="center" v-if="!isInEditModeEmail">
                        <v-col cols="10">
                            <v-icon left>mdi-email</v-icon>
                            <span>{{ email }}</span>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="isInEditModeEmail = true">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </v-row>

                    <!-- Email (edit) -->
                    <v-row no-gutters class="mb-4" v-else align="center">
                        <v-col cols="10">
                            <v-text-field
                                filled
                                hide-details="auto"
                                placeholder="Email"
                                v-model="email_edit"
                                prepend-icon="mdi-email"
                            ></v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-btn icon color="error" @click="editEmailCancel">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-btn icon color="success" @click="editEmailOK">
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                    </v-row>

                    <!-- Birthday (normal) -->
                    <v-row no-gutters class="mb-4" align="center" v-if="!isInEditModeBirthday">
                        <v-col cols="10">
                            <v-icon left>mdi-cake-variant</v-icon>
                            <span>{{ dob }}</span>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="isInEditModeBirthday = true">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </v-row>

                    <!-- Birthday (edit) -->
                    <v-row no-gutters class="mb-4" v-else align="center">
                        <v-col cols="10">
                            <v-text-field
                                filled
                                hide-details="auto"
                                placeholder="Birthdate"
                                v-model="dob_edit"
                                prepend-icon="mdi-cake-variant"
                            ></v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-btn icon color="error" @click="editBirthdayCancel">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-btn icon color="success" @click="editBirthdayOK">
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                    </v-row>

                    <!-- Address (normal) -->
                    <v-row no-gutters class="mb-4" align="center" v-if="!isInEditModeAddress">
                        <v-col cols="10">
                            <v-icon left>mdi-map-marker</v-icon>
                            <span>{{ address }}</span>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="isInEditModeAddress = true">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </v-row>

                    <!-- Address (edit) -->
                    <v-row no-gutters class="mb-4" v-else align="center">
                        <v-col cols="10">
                            <v-text-field
                                filled
                                hide-details="auto"
                                placeholder="Address"
                                v-model="address_edit"
                                prepend-icon="mdi-map-marker"
                            ></v-text-field>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-btn icon color="error" @click="editAddressCancel">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-btn icon color="success" @click="editAddressOK">
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                    </v-row>

                    <!-- Rating (read-only) -->
                    <v-row no-gutters class="mb-4" align="center">
                        <v-col cols="10">
                            <v-icon left color="orange darken-3">mdi-star</v-icon>
                            <span class="orange--text text--darken-3">{{ rating }}</span>
                        </v-col>
                    </v-row>

                    <v-divider class="mb-4"></v-divider>

                    <!-- Change password form -->
                    <v-row no-gutters class="mb-4">
                        <div class="d-flex flex-column" style="width: 100%">
                            <div class="text-h6 font-weight-bold mb-2">Change password</div>
                            <div class="mb-2">Please note that new password cannot be the same as old password.</div>
                            <v-text-field
                                class="mb-2"
                                filled
                                hide-details="auto"
                                placeholder="Old password"
                                v-model="oldPass"
                                :type="oldPassReveal ? 'text' : 'password'"
                                :append-icon="oldPassReveal ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append="oldPassReveal = !oldPassReveal"
                            ></v-text-field>
                            <v-text-field
                                class="mb-2"
                                filled
                                hide-details="auto"
                                placeholder="New password"
                                v-model="newPass"
                                :type="newPassReveal ? 'text' : 'password'"
                                :append-icon="newPassReveal ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append="newPassReveal = !newPassReveal"
                            ></v-text-field>
                            <v-text-field
                                class="mb-2"
                                filled
                                hide-details="auto"
                                placeholder="New password (confirm)"
                                v-model="newPassConfirm"
                                :type="newPassConfirmReveal ? 'text' : 'password'"
                                :append-icon="newPassConfirmReveal ? 'mdi-eye-off' : 'mdi-eye'"
                                @click:append="newPassConfirmReveal = !newPassConfirmReveal"
                            ></v-text-field>
                            <v-btn class="mb-2" :disabled="!allowChangingPassword" @click="changePassword">
                                <v-icon left>mdi-key</v-icon>
                                <span>Change password</span>
                            </v-btn>
                        </div>
                    </v-row>

                    <v-row no-gutters v-if="role === utils.ROLES.BIDDER">
                        <v-col>
                            <v-divider class="mb-4"></v-divider>

                            <v-row no-gutters class="mb-4">
                                <div class="d-flex flex-column" style="width: 100%">
                                    <div class="text-h6 font-weight-bold mb-2">Upgrade to seller</div>
                                    <div class="mb-2">Press the button below to request upgrading to seller.</div>
                                    <div class="mb-2">
                                        Once completed, check your email for approval, then log out and log back in
                                        Ouchtion.
                                    </div>
                                    <v-btn
                                        class="mb-2"
                                        color="orange darken-3"
                                        dark
                                        v-if="!upgradeRequestSent"
                                        @click="requestUpgradeToSeller"
                                    >
                                        <v-icon left>mdi-star</v-icon>
                                        <span>Request Upgrading to Seller</span>
                                    </v-btn>
                                    <v-btn class="mb-2" disabled v-else>
                                        <v-icon left>mdi-star</v-icon>
                                        <span>You're already sent a request.</span>
                                    </v-btn>
                                </div>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
import { redirectToHomeIf } from "@/utils/redirectToHomeIf";
import { showSnack } from "@/utils/showSnack";
import { mapState, mapActions } from "vuex";
import { ROLES } from "@/utils/constants";

export default {
    name: "UserProfile",
    data() {
        return {
            utils: { ROLES },

            // Fields

            // Fields -- temp. for editing
            username_edit: null,
            email_edit: null,
            dob_edit: null,
            address_edit: null,

            // Fields -- Edit toggle
            isInEditModeName: false,
            isInEditModeEmail: false,
            isInEditModeBirthday: false,
            isInEditModeAddress: false,

            // Password
            oldPass: "",
            newPass: "",
            newPassConfirm: "",

            // Password -- reveal
            oldPassReveal: false,
            newPassReveal: false,
            newPassConfirmReveal: false,

            // Upgrade to Seller
            upgradeRequestSent: false,
        };
    },
    computed: {
        ...mapState("CurrentUserModule", ["username", "email", "dob", "address", "rating", "role"]),
        allowChangingPassword: function () {
            const conditions = [
                this.oldPass.length > 0,
                this.newPass.length > 0,
                this.newPassConfirm.length > 0,
                this.newPass !== this.oldPass,
                this.newPass === this.newPassConfirm,
            ];
            return conditions.every((each) => each === true);
        },
    },
    methods: {
        ...mapActions("CurrentUserModule", ["editUser"]),

        // username
        editNameOK() {
            this.isInEditModeName = false;
            this.editUser({
                username: this.username_edit,
            });
        },
        editNameCancel() {
            this.username_edit = this.username;
            this.isInEditModeName = false;
        },

        // email
        editEmailOK() {
            this.isInEditModeEmail = false;
            // send update
            this.email = this.email_edit;
        },
        editEmailCancel() {
            this.email_edit = this.email;
            this.isInEditModeEmail = false;
        },

        // dob
        editBirthdayOK() {
            this.isInEditModeBirthday = false;
            // send update
            this.dob = this.dob_edit;
        },
        editBirthdayCancel() {
            this.dob_edit = this.dob;
            this.isInEditModeBirthday = false;
        },

        // address
        editAddressOK() {
            this.isInEditModeAddress = false;
            // send update
            this.address = this.address_edit;
        },
        editAddressCancel() {
            this.address_edit = this.address;
            this.isInEditModeAddress = false;
        },

        // password
        changePassword() {
            // send update
            this.oldPass = "";
            this.newPass = "";
            this.newPassConfirm = "";
            showSnack("Password changed");
        },

        // upgrade
        requestUpgradeToSeller() {
            // send update
            this.upgradeRequestSent = true;
        },
    },
    beforeCreate() {
        redirectToHomeIf(this, [ROLES.BIDDER, ROLES.SELLER]);
    },
    mounted() {
        this.username_edit = this.username;
        this.email_edit = this.email;
        this.dob_edit = this.dob;
        this.address_edit = this.address;
    },
};
</script>

<style scoped>
.name-field >>> input {
    font-size: 2.125rem;
    font-weight: 300;
}
</style>
