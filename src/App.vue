<template>
    <v-app>
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
    </v-app>
</template>

<script>
import "@fontsource/inter/variable.css";
import NprogressContainer from "vue-nprogress/src/NprogressContainer";

import TopBar from "./components/topbar/TopBar.vue";

export default {
    name: "App",
    components: { TopBar, NprogressContainer },
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
