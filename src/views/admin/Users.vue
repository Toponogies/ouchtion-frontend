<template>
    <v-row no-gutters>
        <v-col>
            <!-- Table -->
            <v-data-table
                :loading="isLoading"
                loading-text="Loading data"
                :headers="headers"
                :items="items"
                :items-per-page="-1"
            >
                <!-- Table top toolbar -->
                <template v-slot:top>
                    <v-row no-gutters class="pa-4">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="handleCreateUserOpen()">
                            <v-icon left>mdi-plus</v-icon>
                            Add Bidder
                        </v-btn>
                    </v-row>
                </template>

                <!-- Column: Image (dummy avatar) -->
                <template v-slot:[`item.dummyAvatar`]="{}">
                    <v-avatar color="primary" size="36">
                        <v-icon dark>mdi-account-circle</v-icon>
                    </v-avatar>
                </template>

                <!-- Column: Action buttons -->
                <template v-slot:[`item.actions`]="{ item }">
                    <!-- Chip: user not verified -->
                    <!-- Shown only on not-verified users -- clicking should do nothing -->
                    <v-chip outlined color="error" v-if="item.is_active === 0">NOT VERIFIED</v-chip>

                    <!-- Button with tooltip: set as bidder -->
                    <!-- Shown only on seller accounts -->
                    <v-tooltip bottom v-if="item.role === utils.ROLES.SELLER">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                icon
                                @click="handleDowngradeUserToBidder(item.id)"
                                v-on="on"
                                v-bind="attrs"
                                color="error"
                            >
                                <v-icon>mdi-arrow-down-thick</v-icon>
                            </v-btn>
                        </template>
                        <span>Downgrade to Bidder</span>
                    </v-tooltip>

                    <!-- Button with tooltip: edit user -->
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon @click="handleEditUserOpen(item)" v-on="on" v-bind="attrs">
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                        <span>Edit user</span>
                    </v-tooltip>

                    <!-- Button with tooltip: remove user -->
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon @click="handleRemoveUser(item.id)" v-on="on" v-bind="attrs">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </template>
                        <span>Remove user</span>
                    </v-tooltip>
                </template>
            </v-data-table>

            <!-- Form: user editor -->
            <v-dialog v-model="userEditorDialogOpened" max-width="640" persistent>
                <v-card>
                    <!-- Header (Manual) -->
                    <v-row no-gutters class="px-4 py-4">
                        <div class="text-h6 font-weight-bold">
                            <span v-if="currentUserId === null">Create New User</span>
                            <span v-else>Edit User</span>
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="handleFormCancel()">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-row>

                    <!-- Hint: current user ID -->
                    <v-row no-gutters class="px-4 pb-4" v-if="currentUserId !== null">
                        <div>Current user ID: {{ currentUserId }}</div>
                    </v-row>

                    <!-- Form -->
                    <v-form v-model="isFormValid">
                        <!-- Full name -->
                        <v-row no-gutters class="px-4 pb-4">
                            <v-text-field
                                class="mb-2"
                                filled
                                hide-details="auto"
                                label="Name"
                                v-model="currentFullName"
                                :rules="[inputRules.fieldNotEmpty]"
                                prepend-icon="mdi-account"
                            ></v-text-field>
                        </v-row>

                        <!-- Email -->
                        <v-row no-gutters class="px-4 pb-4">
                            <v-text-field
                                class="mb-2"
                                filled
                                hide-details="auto"
                                label="Email"
                                v-model="currentEmail"
                                :rules="[inputRules.fieldNotEmpty]"
                                prepend-icon="mdi-email"
                            ></v-text-field>
                        </v-row>

                        <!-- Address -->
                        <v-row no-gutters class="px-4 pb-4">
                            <v-text-field
                                class="mb-2"
                                filled
                                hide-details="auto"
                                label="Address"
                                v-model="currentAddress"
                                :rules="[inputRules.fieldNotEmpty]"
                                prepend-icon="mdi-map-marker"
                            ></v-text-field>
                        </v-row>

                        <!-- Date of Birth -->
                        <v-row no-gutters class="px-4 pb-4">
                            <v-menu
                                v-model="currentDoBPickerOpened"
                                :close-on-content-click="false"
                                transition="slide-y-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="currentDoB"
                                        v-on="on"
                                        v-bind="attrs"
                                        label="Date of Birth"
                                        readonly
                                        filled
                                        class="mr-2"
                                        hide-details="auto"
                                        :rules="[inputRules.fieldNotEmpty]"
                                        prepend-icon="mdi-cake-variant"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="currentDoB"
                                    @input="currentDoBPickerOpened = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-row>

                        <!-- Password field (new user) -->
                        <v-row no-gutters v-if="currentUserId === null">
                            <v-row no-gutters class="px-4 py-4">
                                <div>A password is required for the user to login.</div>
                            </v-row>

                            <v-row no-gutters class="px-4 pb-4">
                                <v-text-field
                                    class="mb-2"
                                    filled
                                    hide-details="auto"
                                    label="New password"
                                    v-model="newPassword"
                                    prepend-icon="mdi-key"
                                    :type="newPasswordReveal ? 'text' : 'password'"
                                    :append-icon="newPasswordReveal ? 'mdi-eye-off' : 'mdi-eye'"
                                    :rules="[inputRules.fieldNotEmpty]"
                                    @click:append="newPasswordReveal = !newPasswordReveal"
                                ></v-text-field>
                            </v-row>
                        </v-row>

                        <!-- Password field (existing user) -->
                        <v-row no-gutters v-else>
                            <v-row no-gutters class="px-4 py-4">
                                <div>This password field is only for updating this user's password.</div>
                            </v-row>

                            <v-row no-gutters class="px-4 pb-4">
                                <v-text-field
                                    class="mb-2"
                                    filled
                                    hide-details="auto"
                                    label="New password"
                                    v-model="newPassword"
                                    prepend-icon="mdi-key"
                                    :type="newPasswordReveal ? 'text' : 'password'"
                                    :append-icon="newPasswordReveal ? 'mdi-eye-off' : 'mdi-eye'"
                                    @click:append="newPasswordReveal = !newPasswordReveal"
                                ></v-text-field>
                            </v-row>
                        </v-row>
                    </v-form>

                    <!-- Submit Button -->
                    <v-row no-gutters class="px-4 pb-4">
                        <v-spacer></v-spacer>
                        <v-btn
                            v-if="currentUserId === null"
                            color="primary"
                            :disabled="isFormValid === false"
                            @click="handleCreateUserOK()"
                            >Submit</v-btn
                        >
                        <v-btn v-else color="primary" :disabled="isFormValid === false" @click="handleEditUserOK()"
                            >Submit</v-btn
                        >
                    </v-row>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { ROLES } from "@/utils/constants";
import { fromTimestamp } from "@/utils/timeUtils";

export default {
    name: "Users",
    data() {
        return {
            utils: { ROLES },
            userEditorDialogOpened: false,
            currentUser: null,
            currentUserId: null,
            currentFullName: null,
            currentEmail: null,
            currentAddress: null,
            currentDoB: null,
            currentDoBPickerOpened: false,
            newPassword: null,
            newPasswordReveal: false,
            isFormValid: false,
            inputRules: {
                fieldNotEmpty: (value) => !!value || "Field cannot be empty",
            },
        };
    },
    computed: {
        ...mapState("AdminUsersDashboardModule", ["isLoading", "headers", "items"]),
    },
    methods: {
        ...mapActions("AdminUsersDashboardModule", [
            "getItems",
            "create",
            "updateInfo",
            "updateEmail",
            "updatePassword",
            "delete",
            "setAsBidder",
        ]),

        handleCreateUserOpen() {
            this.currentUserId = null;
            this.currentFullName = null;
            this.currentEmail = null;
            this.currentAddress = null;
            this.currentDoB = null;
            this.newPassword = null;
            this.isPasswordValid = true;
            this.userEditorDialogOpened = true;
        },

        handleCreateUserOK() {
            this.currentDoB = `${this.currentDoB} 00:00:00`;
            this.create({
                full_name: this.currentFullName,
                email: this.currentEmail,
                address: this.currentAddress,
                dob: this.currentDoB,
                role: ROLES.BIDDER,
                password: this.newPassword,
            });
            this.userEditorDialogOpened = false;
        },

        handleEditUserOpen(item) {
            this.currentUser = item;
            this.currentUserId = item.id;
            this.currentFullName = item.full_name;
            this.currentEmail = item.email;
            this.currentAddress = item.address;
            this.currentDoB = item.dob ? fromTimestamp(item.dob).date : null;
            this.newPassword = null;
            this.userEditorDialogOpened = true;
        },

        handleEditUserOK() {
            this.currentDoB = `${this.currentDoB} 00:00:00`;

            if (this.currentUser.email !== this.currentEmail) {
                this.updateEmail({
                    id: this.currentUserId,
                    email: this.currentEmail,
                });
            }

            this.updateInfo({
                id: this.currentUserId,
                full_name: this.currentFullName,
                address: this.currentAddress,
                dob: this.currentDoB,
            });

            if (this.newPassword?.length > 0) {
                this.updatePassword({
                    id: this.currentUserId,
                    password: this.newPassword,
                });
            }

            this.userEditorDialogOpened = false;
        },

        handleFormCancel() {
            this.userEditorDialogOpened = false;
        },

        handleDowngradeUserToBidder(id) {
            this.setAsBidder(id);
        },

        handleRemoveUser(id) {
            this.delete(id);
        },
    },
    mounted() {
        this.getItems();
    },
};
</script>
