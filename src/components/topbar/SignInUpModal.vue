<template>
    <v-dialog v-model="isModalOpened" max-width="640" persistent>
        <v-card>
            <v-row no-gutters>
                <v-tabs fixed-tabs>
                    <v-tab>Sign in</v-tab>
                    <v-tab>Sign up</v-tab>
                    <v-tab>Reset pass</v-tab>
                    <v-btn icon large tile @click="handleDialogClose" height="100%" class="px-6">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>

                    <v-tab-item>
                        <v-container class="pa-4">
                            <sign-in-form></sign-in-form>
                        </v-container>
                    </v-tab-item>
                    <v-tab-item>
                        <v-container class="pa-4">
                            <sign-up-form></sign-up-form>
                        </v-container>
                    </v-tab-item>
                    <v-tab-item>
                        <v-container class="pa-4">
                            <reset-form></reset-form>
                        </v-container>
                    </v-tab-item>
                </v-tabs>
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import SignInForm from "@/components/topbar/SignInForm";
import SignUpForm from "@/components/topbar/SignUpForm";
import ResetForm from "@/components/topbar/ResetForm";

export default {
    name: "SignInUpModal",
    components: { SignInForm, SignUpForm, ResetForm },
    computed: {
        ...mapState("AuthModule", ["isModalOpened"]),
    },
    methods: {
        ...mapMutations("AuthModule", ["setModalState"]),
        handleDialogClose() {
            this.setModalState(false);
        },
    },
};
</script>
