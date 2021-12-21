<template>
    <v-app>
        <v-container>
            <v-row justify="center">
                <!-- Actual view starts here -->
                <v-col xl="6" lg="8" md="10">
                    <v-row id="title-bar" class="pt-8 pb-4">
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
                    <v-row id="content">
                        <router-view />
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
import AppTitle from "@/components/AppTitle";
import UserAccountActions from "@/components/UserAccountActions";
import SearchBox from "@/components/SearchBox";
import CategoryList from "@/components/CategoryList";

export default {
    name: "App",
    components: { AppTitle, UserAccountActions, SearchBox, CategoryList },
};
</script>
