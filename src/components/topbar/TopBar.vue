<template>
    <div>
        <v-row id="title-bar" class="pt-4 pb-4">
            <app-title></app-title>
            <v-spacer></v-spacer>
            <user-account-actions></user-account-actions>
        </v-row>
        <v-row id="search-combo" class="pt-4 pb-8">
            <v-card width="100%">
                <search-box></search-box>
                <v-divider></v-divider>
                <category-list></category-list>
            </v-card>
        </v-row>
    </div>
</template>

<script>
import AppTitle from "@/components/topbar/AppTitle";
import UserAccountActions from "@/components/topbar/UserAccountActions";
import SearchBox from "@/components/topbar/SearchBox";
import CategoryList from "@/components/topbar/CategoryList";

export default {
    name: "TopBar",
    components: { AppTitle, UserAccountActions, SearchBox, CategoryList },
};
</script>
