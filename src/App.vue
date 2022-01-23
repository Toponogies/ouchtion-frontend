<template>
    <v-app>
        <div id="top"></div>
        <nprogress-container></nprogress-container>
        <v-container>
            <v-row justify="center">
                <v-col class="ma-8" lg="10" xl="8">
                    <!-- Actual view starts here -->
                    <top-bar></top-bar>
                    <v-row id="content">
                        <router-view :key="$router.path" />
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <app-snackbar></app-snackbar>
    </v-app>
</template>

<script>
import "@fontsource/inter/variable.css";
import NprogressContainer from "vue-nprogress/src/NprogressContainer";

import TopBar from "@/components/topbar/TopBar.vue";
import AppSnackbar from "@/components/etc/snackbar";

import { socket } from "@/socket/connect";
import { CATEGORY_LIST_UPDATE } from "./utils/constants";

export default {
    name: "App",
    components: { TopBar, NprogressContainer, AppSnackbar },
    created() {
        socket.on(CATEGORY_LIST_UPDATE, () => {
            // Get category again and update the list
        });
    },
};
</script>

<style>
#nprogess .spinner,
#nprogress .spinner-icon {
    display: none !important;
}
#nprogress .bar {
    background: #007bff;
    height: 8px;
}
</style>
