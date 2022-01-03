<template>
    <v-container class="ma-0 pa-0">
        <v-card class="pa-4">
            <div id="search-result-header">
                <span class="text-h5 font-weight-bold pa-2" v-if="queryKeyword">
                    {{ totalResultCount }} results for "{{ queryKeyword }}"
                </span>
                <span class="text-h5 font-weight-bold pa-2" v-else>
                    Products in category "{{ queryCategoryName }}"
                </span>
            </div>
            <v-row no-gutters class="pa-2" v-for="product in products" :key="product.id">
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
                v-model="currentPage"
                :total-visible="SEARCH_PAGINATION_VISIBLE_PAGES"
            ></v-pagination>
        </v-card>
    </v-container>
</template>

<script>
import ProductCardLarge from "@/components/productListings/ProductCardLarge";
import { SEARCH_RESULTS_PER_PAGE, SEARCH_PAGINATION_VISIBLE_PAGES } from "@/utils/constants";
import { generateMockProductTotalCount, generateMockProduct, generateCategories } from "@/utils/mockUtils";
import { find } from "lodash-es";

export default {
    name: "Home",
    components: { ProductCardLarge },
    data() {
        return {
            SEARCH_PAGINATION_VISIBLE_PAGES,
            queryKeyword: null,
            queryCategoryId: null,
            queryCategoryName: null,
            totalResultCount: 0,
            currentPage: 1,
            products: [],
        };
    },
    watch: {
        currentPage() {
            // "Fetch" new products in list
            this.fetchProducts();
            // Smoothly scroll back to top of result
            this.scrollToTop();
        },
    },
    computed: {
        resultPageCount() {
            return Math.ceil(this.totalResultCount / SEARCH_RESULTS_PER_PAGE);
        },
    },
    methods: {
        setQuery() {
            this.queryKeyword = null;
            this.queryCategoryId = null;
            if (this.$route.query.q) {
                this.queryKeyword = this.$route.query.q;
            } else if (this.$route.query.cat) {
                this.queryCategoryId = this.$route.query.cat;
                this.queryCategoryName = this.getCategoryName(this.queryCategoryId);
            }
        },
        fetchResultCount() {
            this.totalResultCount = generateMockProductTotalCount();
        },
        fetchProducts() {
            this.products = generateMockProduct(
                this.currentPage * SEARCH_RESULTS_PER_PAGE > this.totalResultCount
                    ? this.totalResultCount - (this.currentPage - 1) * 10
                    : SEARCH_RESULTS_PER_PAGE
            );
        },
        scrollToTop() {
            this.$vuetify.goTo("#search-result-header", {
                duration: 500,
                easing: "easeOutQuint",
            });
        },
        resetSearch() {
            this.products = [];
            this.currentPage = 1;
            this.fetchResultCount();
            this.fetchProducts();
        },
        // eslint-disable-next-line no-unused-vars
        getCategoryName(id) {
            const categories = generateCategories();
            return find(categories, { category_id: parseInt(id) }).name;
        },
    },
    mounted() {
        this.setQuery();
        this.resetSearch();
    },
    beforeRouteUpdate(to, _, next) {
        // We have to manually set query on route update -- Vue Router is not "reactive" enough in this case (prolly)
        this.queryKeyword = null;
        this.queryCategoryId = null;
        if (to.query.q) {
            this.queryKeyword = to.query.q;
        } else if (to.query.cat) {
            this.queryCategoryId = to.query.cat;
            this.queryCategoryName = this.getCategoryName(this.queryCategoryId);
        }
        this.resetSearch();
        next();
    },
};
</script>
