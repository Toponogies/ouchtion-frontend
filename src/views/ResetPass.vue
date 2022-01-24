<template>
    <v-container class="ma-0 pa-0">
        <v-card class="mb-2 pa-4">
            <div v-if="resetPassSuccess === null || resetPassSuccess === undefined">
                <!-- Header -->
                <v-row no-gutters class="mb-2">
                    <div class="text-h6 font-weight-bold">Enter your new password</div>
                </v-row>

                <!-- Password field -->
                <v-row no-gutters class="mb-2">
                    <v-col>
                        <v-text-field
                            class="mb-2"
                            filled
                            hide-details="auto"
                            placeholder="New password"
                            v-model="password"
                            :type="passwordReveal ? 'text' : 'password'"
                            :append-icon="passwordReveal ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append="passwordReveal = !passwordReveal"
                        ></v-text-field>
                    </v-col>
                </v-row>

                <!-- Button -->
                <v-row no-gutters class="mb-2">
                    <v-spacer></v-spacer>
                    <v-btn @click="reset">
                        <v-icon left>mdi-key</v-icon>
                        <span>Reset password</span>
                    </v-btn>
                    <v-spacer></v-spacer>
                </v-row>
            </div>

            <div v-if="resetPassSuccess === true">
                <div class="d-flex flex-row justify-center align-center">
                    <v-icon size="256">mdi-key</v-icon>
                    <v-icon size="256">mdi-check-bold</v-icon>
                </div>
                <div class="text-center">Password reset.</div>
                <div class="text-center">You can now go to home page then log in.</div>
            </div>

            <div v-if="resetPassSuccess === false">
                <div class="d-flex flex-row justify-center align-center">
                    <v-icon size="256">mdi-key</v-icon>
                    <v-icon size="256">mdi-close-thick</v-icon>
                </div>
                <div class="text-center">Failed to reset your password. Check your email again.</div>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "VerifyAccount",
    data() {
        return {
            password: "",
            passwordReveal: false,
        };
    },
    computed: {
        ...mapState("AuthModule", ["resetPassSuccess"]),
    },
    methods: {
        ...mapActions("AuthModule", ["doReset"]),
        reset() {
            this.doReset({
                token: this.$route.query.token,
                password: this.password,
            });
        },
    },
};
</script>
