<template>
    <v-container class="ma-0 pa-0">
        <v-card class="mb-2 pa-4">
            <div class="d-flex flex-column justify-center align-center">
                <!-- Waiting for verification -->
                <div v-if="verifySuccess === null || verifySuccess === undefined">
                    <v-icon size="256">mdi-timer-sand</v-icon>
                    <div class="text-center">Waiting for verification&hellip;</div>
                </div>

                <!-- Verification succedded -->
                <div v-if="verifySuccess === true">
                    <div class="d-flex flex-row">
                        <v-icon size="256">mdi-email-outline</v-icon>
                        <v-icon size="256">mdi-check-bold</v-icon>
                    </div>
                    <div class="text-center">Verification succeeded. Welcome to Ouchtion!</div>
                    <div class="text-center">You can now go to home page then log in.</div>
                </div>

                <!-- Verification failed -->
                <div v-if="verifySuccess === false">
                    <div class="d-flex flex-row">
                        <v-icon size="256">mdi-email-outline</v-icon>
                        <v-icon size="256">mdi-close-thick</v-icon>
                    </div>
                    <div class="text-center">Verification failed. Check your email again.</div>
                </div>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "VerifyAccount",
    computed: {
        ...mapState("AuthModule", ["verifySuccess"]),
    },
    methods: {
        ...mapActions("AuthModule", ["doVerify"]),
        verify() {
            this.doVerify(this.$route.query.token);
        },
    },
    mounted() {
        this.verify();
    },
};
</script>
