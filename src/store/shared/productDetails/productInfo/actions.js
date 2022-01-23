import { getProduct, getProductBidding, getProductDescription, getProductImage, getProductRelate } from "@/api/product";
import { getUserWithPoint } from "@/api/user";
import { getSingleCategory } from "@/utils/categoryUtils";
import { IMAGE_API_ENDPOINT } from "@/utils/constants";
import { hiddenName } from "@/utils/hiddenName";
import { toLongTimestamp } from "@/utils/timeUtils";
import { find } from "lodash-es";

export default {
    setProductId({ commit }, id) {
        commit("setProductId", parseInt(id));
    },

    fetchAllDetails({ dispatch }) {},

    async getProductInfo({ commit }) {
        // Basic info
        let productInfo = {};
        try {
            productInfo = await getProduct(state.id);
            commit("setProductInfo", productInfo);
        } catch (error) {
            console.log(error.response);
            console.log(`Fetching product info failed: ${error}`);
        }
    },

    async getCategories({ commit }) {
        // Categories
        try {
            const categoryOfProduct = getSingleCategory(productInfo.category_id);
            commit("setCategoriesOfProduct", [categoryOfProduct]);
        } catch (error) {
            console.log(`Fetching categories of this product failed: ${error}`);
        }
    },

    async getSellerInfo({ commit }) {
        // Seller username/rating
        try {
            const sellerInfo = await getUserWithPoint(productInfo.seller_id);
            commit("setSellerInfo", sellerInfo);
        } catch (error) {
            console.log(`Fetching seller info failed: ${error}`);
        }
    },

    async getHighestBidderInfo({ commit }) {
        // Highest bidder username/rating
        try {
            const highestBidderInfo = await getUserWithPoint(productInfo.buyer_id);
            commit("setHighestBidderInfo", highestBidderInfo);
        } catch (error) {
            console.log(`Fetching highest bidder info failed: ${error}`);
        }
    },

    async getDescriptions({ commit }) {
        // Descriptions
        try {
            let productDescriptions = await getProductDescription(state.id);
            // Mark the first description as primary
            productDescriptions = productDescriptions.map((each, index) => ({ ...each, isInit: index === 0 }));
            // Split into primary and secondary
            let primaryDescription = find(productDescriptions, { isInit: true });
            let secondaryDescriptions = productDescriptions.filter((each) => each.isInit === false);
            commit("setProductDescriptions", { primaryDescription, secondaryDescriptions });
        } catch (error) {
            console.log(`Fetching product descriptions failed: ${error}`);
        }
    },

    async getImages({ commit }) {
        // Images
        try {
            let productImages = await getProductImage(state.id);
            // Turn relative paths to absolute paths
            productImages = productImages.map((each) => ({
                ...each,
                path: `${IMAGE_API_ENDPOINT}/${each.path}`,
            }));
            // Split into primary and secondary group
            let primaryImage = productImages[0];
            let secondaryImages = productImages.filter((_, index) => index !== 0);
            commit("setProductImages", { primaryImage, secondaryImages });
        } catch (error) {
            console.log(`Fetching product images failed: ${error}`);
        }
    },

    async getBiddings({ commit }) {
        // Biddings
        let productBiddings = await getProductBidding(state.id);
        if (productBiddings) {
        } else {
            console.log(`Fetching product biddings failed: ${error}`);
        }

        try {
            // Expand timestamp, then censor names
            productBiddings = productBiddings.map((each) => ({
                ...each,
                time: toLongTimestamp(each.time),
                full_name: hiddenName(each.full_name),
            }));

            let isAutoBidEnabled = false;

            productBiddings.forEach((bidding) => {
                if (
                    bidding.user_id === rootState.CurrentUserModule.id &&
                    bidding.max_price !== null &&
                    bidding.is_auto_process === 1
                )
                    isAutoBidEnabled = true;
            });
            commit("setProductBiddings", productBiddings);
            commit("setIsAutoBidState", isAutoBidEnabled);
        } catch (error) {
            console.log(`Fetching product biddings failed: ${error}`);
        }
    },

    async getRelatedProducts({ commit }) {
        try {
            const relatedProducts = await getProductRelate(productInfo.category_id);
            let data = [];
            relatedProducts?.forEach(async (product) => {
                let user = await getUserWithPoint(product.buyer_id);
                // Remove current product from filtered list to prevent duplicates
                if (product.product_id !== state.id) {
                    data.push({
                        id: product.product_id,
                        title: product.name,
                        image: `${IMAGE_API_ENDPOINT}/${product.avatar}`,
                        bidderCount: product.bidding_count,
                        bidHighestPrice: product.current_price,
                        bidHighestUser: user.full_name,
                        buyNowPrice: product.buy_price,
                        startTime: product.start_at,
                        endTime: product.end_at,
                        isOnWatchlist: false,
                    });
                }
            });
            commit("setRelatedProducts", data);
        } catch (error) {
            console.log(`Fetching related products failed: ${error}`);
        }
    },
};
