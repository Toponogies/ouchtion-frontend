<template>
    <v-container class="ma-0 pa-0">
        <v-card class="pa-4">
            <!-- Header -->
            <div id="search-result-header" class="text-h5 font-weight-bold pa-2">
                <div v-if="queryType === utils.SEARCH_TYPES.KEYWORD">
                    <span v-if="resultTotalCount === 0"> No results for "{{ queryContent }}" </span>
                    <span v-else> {{ resultTotalCount }} results for "{{ queryContent }}" </span>
                </div>
                <div v-else-if="queryType === utils.SEARCH_TYPES.CATEGORY">
                    Products in category "{{ utils.getCategoryName(queryContent) }}"
                </div>
            </div>

            <!-- Placeholder (no results) -->
            <v-row no-gutters class="pa-2" v-if="resultTotalCount === 0">
                <v-col>
                    <v-row no-gutters justify="center" align="center" class="d-flex flex-column">
                        <v-icon large color="grey" class="mb-1">mdi-magnify</v-icon>
                        <div class="grey--text mt-1">No results</div>
                    </v-row>
                </v-col>
            </v-row>

            <!-- Sorting options -->
            <v-row no-gutters class="pa-2">
                <v-chip-group mandatory active-class="primary--text" v-model="selectedSortType">
                    <v-chip v-for="type in sortTypes" :key="type">
                        {{ type }}
                    </v-chip>
                </v-chip-group>
            </v-row>

            <!-- Listing -->
            <v-row no-gutters class="pa-2" v-for="product in resultCurrentContent" :key="product.id">
                <product-card-large
                    :id="product.id"
                    :title="product.title"
                    :image="product.image"
                    :bidderCount="product.bidderCount"
                    :bidHighestPrice="product.bidHighestPrice"
                    :bidHighestUser="product.bidHighestUser"
                    :buyNowPrice="product.buyNowPrice"
                    :startTime="product.startTime"
                    :endTime="product.endTime"
                    :isOnWatchlist="product.isOnWatchlist"
                ></product-card-large>
            </v-row>

            <!-- List pager -->
            <v-pagination
                circle
                class="pt-4"
                :length="resultPageCount"
                v-model="local_queryPage"
                :total-visible="resultPagerVisibleCount"
                v-if="resultTotalCount > 0"
            ></v-pagination>
        </v-card>
    </v-container>
</template>

<script>
import ProductCardLarge from "@/components/productListings/ProductCardLarge";
import { mapState, mapGetters, mapActions } from "vuex";
import { scrollToTop } from "@/utils/scrollToTop";
import { getCategoryName } from "@/utils/categoryUtils";
import { BIDDING_BUY, PRODUCT_ADD, PRODUCT_DELETE, PRODUCT_WON, SEARCH_ORDER, SEARCH_TYPES } from "@/utils/constants";
import { socket } from "@/socket/connect";

export default {
    name: "Home",
    components: { ProductCardLarge },

    data() {
        return {
            utils: { SEARCH_TYPES, getCategoryName },
            local_queryPage: null,
            selectedSortType: null,
            selectedSortKey: SEARCH_ORDER.TIME_ASC,
            sortTypes: [
                "Ending soon",
                "Ending late",
                "Most biddings",
                "Least biddings",
                "Price low to high",
                "Price high to low",
            ],
        };
    },

    watch: {
        local_queryPage() {
            this.switchPage();
            scrollToTop(this);
        },
        selectedSortType() {
            // find enum corresponding to selected sort type
            switch (this.selectedSortType) {
                case "Ending soon":
                    this.selectedSortKey = SEARCH_ORDER.TIME_ASC;
                    break;
                case "Ending late":
                    this.selectedSortKey = SEARCH_ORDER.TIME_DESC;
                    break;
                case "Most biddings":
                    this.selectedSortKey = SEARCH_ORDER.BIDDING_ASC;
                    break;
                case "Least biddings":
                    this.selectedSortKey = SEARCH_ORDER.BIDDING_DESC;
                    break;
                case "Price low to high":
                    this.selectedSortKey = SEARCH_ORDER.PRICE_ASC;
                    break;
                case "Price high to low":
                    this.selectedSortKey = SEARCH_ORDER.PRICE_DESC;
                    break;
            }
            this.switchPage();
        },
    },

    computed: {
        ...mapState("SearchModule", [
            "queryType",
            "queryContent",
            "queryLimit",
            "queryPage",
            "resultTotalCount",
            "resultCurrentContent",
            "resultPagerVisibleCount",
        ]),
        ...mapGetters("SearchModule", ["resultPageCount"]),
    },

    methods: {
        ...mapActions("SearchModule", ["setQuery", "fetchResult"]),

        populateSearch() {
            this.fetchResult();
            this.local_queryPage = this.queryPage;
        },

        switchPage() {
            this.setQuery({
                keyword: this.$route.query.q,
                categoryId: this.$route.query.cat,
                sort: this.selectedSortKey,
                page: this.local_queryPage,
            });
            this.populateSearch();
        },
    },

    mounted() {
        this.setQuery({
            keyword: this.$route.query.q,
            categoryId: this.$route.query.cat,
            sort: this.selectedSortKey,
            page: this.$route.query.p,
        });
        this.populateSearch();
    },

    beforeRouteUpdate(to, _, next) {
        this.setQuery({
            keyword: to.query.q,
            categoryId: to.query.cat,
            sort: this.selectedSortKey,
            page: to.query.p,
        });
        this.populateSearch();
        next();
    },

    created() {
        socket.on(PRODUCT_ADD, () => {
            // Update the search result
            this.populateSearch();
        });

        socket.on(PRODUCT_DELETE, () => {
            // Update the search result
            this.populateSearch();
        });

        socket.on(BIDDING_BUY, () => {
            // Update the search result
            this.populateSearch();
        });

        socket.on(PRODUCT_WON, () => {
            // Update the search result
            this.populateSearch();
        });
    },
};
</script>
