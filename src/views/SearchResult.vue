<template>
    <v-container class="ma-0 pa-0">
        <v-card class="pa-4">
            <div id="search-result-header" class="text-h5 font-weight-bold pa-2">
                <span v-if="queryType === utils.SEARCH_TYPES.KEYWORD">
                    {{ resultTotalCount }} results for "{{ queryContent }}"
                </span>
                <span v-else> Products in category "{{ utils.getCategoryName(queryContent) }}" </span>
            </div>
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
            <v-pagination
                circle
                class="pt-4"
                :length="resultPageCount"
                v-model="local_queryPage"
                :total-visible="resultPagerVisibleCount"
            ></v-pagination>
        </v-card>
    </v-container>
</template>

<script>
import ProductCardLarge from "@/components/productListings/ProductCardLarge";
import { mapState, mapGetters, mapActions } from "vuex";
import { scrollToTop } from "@/utils/scrollToTop";
import { getCategoryName } from "@/utils/categoryUtils";
import { SEARCH_TYPES } from "@/utils/constants";

export default {
    name: "Home",
    components: { ProductCardLarge },

    data() {
        return {
            utils: { SEARCH_TYPES, getCategoryName },
            local_queryPage: null,
        };
    },

    watch: {
        local_queryPage() {
            this.switchPage();
            scrollToTop(this);
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
                page: this.local_queryPage,
            });
            this.populateSearch();
        },
    },

    mounted() {
        this.setQuery({
            keyword: this.$route.query.q,
            categoryId: this.$route.query.cat,
            page: this.$route.query.p,
        });
        this.populateSearch();
    },

    beforeRouteUpdate(to, _, next) {
        this.setQuery({
            keyword: to.query.q,
            categoryId: to.query.cat,
            page: to.query.p,
        });
        this.populateSearch();
        next();
    },
};
</script>
