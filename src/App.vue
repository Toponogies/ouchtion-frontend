<template>
    <v-app>
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

import TopBar from "./components/topbar/TopBar.vue";

export default {
    name: "App",
    components: { TopBar },
};
</script>
