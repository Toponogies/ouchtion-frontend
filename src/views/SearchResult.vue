<template>
    <v-container class="ma-0 pa-0">
        <v-card class="pa-4">
            <div class="text-h5 font-weight-bold pa-2" id="search-result-header">Search result for "{{ query }}"</div>
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
                :total-visible="7"
            ></v-pagination>
        </v-card>
    </v-container>
</template>

<script>
import ProductCardLarge from "@/components/productListings/ProductCardLarge";

const r = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const ITEM_LIMIT = 10;
let MOCK_PRODUCT_LIST = [];
const MOCK_PRODUCT_GENERATE = () => {
    MOCK_PRODUCT_LIST = [...Array(124)].map((_, index) => ({
        id: `product-id-${index}`,
        title: `Product number ${index}`,
        image: `https://picsum.photos/200?random=${r(0, 1024)}`,
        bidderCount: r(0, 100),
        bidHighestPrice: 100000 * r(1, 999),
        bidHighestUser: `username${r(1, 100)}`,
        buyNowPrice: r(0, 1) ? 1000000 * r(1, 999) : null,
        startTime: "2021-12-31 00:00:00",
        endTime: `2022-01-${r(1, 14)} 0${r(0, 9)}:${r(10, 59)}:${r(10, 59)}`,
        isOnWatchlist: r(0, 1) ? true : false,
    }));
};
MOCK_PRODUCT_GENERATE();

export default {
    name: "Home",
    components: { ProductCardLarge },
    data() {
        return {
            query: this.$route.query.q,
            totalResultCount: 128,
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
            return Math.ceil(this.totalResultCount / ITEM_LIMIT);
        },
    },
    methods: {
        fetchResultCount() {
            this.totalResultCount = MOCK_PRODUCT_LIST.length;
        },
        fetchProducts() {
            this.products = MOCK_PRODUCT_LIST.slice((this.currentPage - 1) * 10, this.currentPage * 10);
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
            MOCK_PRODUCT_GENERATE();
            this.fetchResultCount();
            this.fetchProducts();
        },
    },
    mounted() {
        this.fetchResultCount();
        this.fetchProducts();
    },
    beforeRouteUpdate(to, _, next) {
        this.query = to.query.q;
        this.resetSearch();
        next();
    },
};
</script>
