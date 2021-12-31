<template>
    <v-expansion-panels accordion flat :focusable="false">
        <v-expansion-panel>
            <v-expansion-panel-header :ripple="true">
                <template v-slot:default="{ open }">
                    <v-fade-transition>
                        <v-row v-if="!open">
                            <v-chip
                                v-for="category in dummyCategoryList"
                                :key="category"
                                class="mx-1"
                                @click.stop="1 === 1"
                                >{{ category }}</v-chip
                            >
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
            <v-expansion-panel-content>Something else</v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
export default {
    name: "CategoryList",
    data() {
        return {
            dummyCategoryList: ["Phones", "Tablets", "Sleep Enhancers", "Energy Drinks"],
        };
    },
};
</script>
