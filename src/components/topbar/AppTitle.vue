<template>
    <router-link to="/" style="text-decoration: none">
        <v-btn text class="px-0 py-2" color="primary">
            <template v-slot:default>
                <span class="text-h3 font-weight-black">{{ appTitle }}</span>
            </template>
        </v-btn>
    </router-link>
</template>

<script>
import { APP_TITLE } from "@/utils/constants";
export default {
    name: "AppTitle",
    data() {
        return {
            appTitle: APP_TITLE,
        };
    },
};
</script>
