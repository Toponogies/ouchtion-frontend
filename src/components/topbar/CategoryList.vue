<template>
    <v-expansion-panels accordion flat :focusable="false" v-model="expandedPanels">
        <v-expansion-panel>
            <v-expansion-panel-header :ripple="false">
                <template v-slot:default="{ open }">
                    <v-fade-transition>
                        <v-row v-if="!open">
                            <v-chip
                                v-for="category in featuredCategories"
                                :key="category.id"
                                class="mx-1"
                                @click.stop="handleCategoryClick(category.id)"
                                >{{ category.name }}
                            </v-chip>
                        </v-row>
                    </v-fade-transition>
                </template>
                <template v-slot:actions>
                    <v-row align="center">
                        <span class="text-overline px-1 d-none d-md-block">All Categories</span>
                        <v-icon class="px-1">$expand</v-icon>
                    </v-row>
                </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                <v-container class="pa-0">
                    <v-row no-gutters>
                        <v-col class="my-4 lg5-custom" v-for="parent in getParentCategories()" :key="parent.id">
                            <v-card class="pa-4 ma-2" flat color="grey lighten-5">
                                <div class="d-flex flex-column">
                                    <div class="d-flex">
                                        <div class="text-body-1 font-weight-bold">{{ parent.name }}</div>
                                        <v-spacer></v-spacer>
                                        <v-btn icon small @click="handleCategoryClick(parent.id)">
                                            <v-icon>mdi-arrow-right</v-icon>
                                        </v-btn>
                                    </div>
                                    <v-chip
                                        class="mt-2"
                                        style="max-width: fit-content"
                                        v-for="child in getChildCategories(parent.id)"
                                        :key="child.id"
                                        @click.stop="handleCategoryClick(child.id)"
                                    >
                                        {{ child.name }}
                                    </v-chip>
                                </div>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { SEARCH_BOX_FEATURED_CATEGORIES_LIMIT } from "@/utils/constants";

export default {
    name: "CategoryList",
    data() {
        return {
            expandedPanels: [],
        };
    },
    computed: {
        ...mapState("CategoryModule", ["categories"]),
        featuredCategories() {
            // Select 5 random child categories to be featured
            // https://stackoverflow.com/a/38571132
            return this.categories
                .filter((each) => each.parent_category_id !== null)
                .sort(() => 0.5 - Math.random())
                .slice(0, SEARCH_BOX_FEATURED_CATEGORIES_LIMIT)
                .map((each) => ({ name: each.name, id: each.category_id }));
        },
    },
    methods: {
        ...mapActions("CategoryModule", ["fetchAll"]),
        getParentCategories() {
            return this.categories
                .filter((each) => each.parent_category_id === null)
                .map((each) => ({ name: each.name, id: each.category_id }));
        },
        getChildCategories(parentId) {
            return this.categories
                .filter((each) => each.parent_category_id === parentId)
                .map((each) => ({ name: each.name, id: each.category_id }));
        },
        handleCategoryClick(id) {
            this.expandedPanels = []; // Close the category list if expanded
            const nextPath = `/search?cat=${id}`;
            if (this.$router.currentRoute.fullPath !== nextPath) {
                this.$router.push(nextPath);
            }
        },
    },
    mounted() {
        this.fetchAll();
    },
};
</script>

<style scoped>
/* 5 columns on "lg" breakpoint
 * https://stackoverflow.com/a/52754863
 */
@media (min-width: 1264px) and (max-width: 1903px) {
    .flex.lg5-custom {
        width: 20%;
        max-width: 20%;
        flex-basis: 20%;
    }
}
</style>
