<template>
    <v-text-field
        flat
        solo
        clearable
        :hide-details="true"
        height="56px"
        v-model="searchQuery"
        @click:clear="clearQuery"
        @keyup.enter="submit"
        @keyup.esc="clearQuery"
    >
        <template v-slot:prepend-inner>
            <v-icon left>mdi-magnify</v-icon>
        </template>
        <template v-slot:label>
            <span>What are you looking for?</span>
        </template>
        <template v-slot:append-outer v-if="!isQueryEmpty">
            <v-btn text @click="submit">GO</v-btn>
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
    computed: {
        isQueryEmpty() {
            return this.searchQuery.trim().length === 0;
        },
    },
    methods: {
        clearQuery() {
            this.searchQuery = "";
        },
        submit() {
            if (!this.isQueryEmpty) {
                this.$router.push({
                    path: "search",
                    query: {
                        q: this.searchQuery,
                    },
                });
            }
        },
    },
};
</script>
