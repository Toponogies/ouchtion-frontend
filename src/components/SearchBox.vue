<template>
    <v-text-field flat solo clearable :hide-details="true" height="56px" v-model="searchQuery">
        <template v-slot:prepend-inner>
            <v-icon left>mdi-magnify</v-icon>
        </template>
        <template v-slot:label>
            <span>What are you looking for?</span>
        </template>
    </v-text-field>
</template>

<script>
export default {
    name: "SearchBox",
    data() {
        return {
            searchQuery: "",
        };
    },
};
</script>
