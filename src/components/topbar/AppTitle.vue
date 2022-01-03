<template>
    <router-link to="/" style="text-decoration: none">
        <v-btn text class="px-0 py-2" color="primary">
            <template v-slot:default>
                <span class="text-h3 font-weight-black">0uchtion</span>
            </template>
        </v-btn>
    </router-link>
</template>

<script>
export default {
    name: "AppTitle",
};
</script>
