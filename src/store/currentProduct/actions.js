import { getUserWithPoint } from "@/api/user";
import { getProduct, getProductDescription, getProductImage, getProductBidding, getProductRelate } from "@/api/product";
import { getCategory } from "@/api/category";

import { find } from "lodash-es";
import { today, toLongTimestamp } from "@/utils/timeUtils";
import { hiddenName } from "@/utils/hiddenName";
import { IMAGE_API_ENDPOINT } from "@/utils/constants";
import { showSnack } from "@/utils/showSnack";
import { appendDescription } from "@/api/productDescription";

export default {
    setProductId({ commit }, id) {
        commit("setProductId", parseInt(id));
    },

    async fetchAllDetails({ commit, dispatch, state, rootState }) {
        // Basic info
        let productInfo = {};
        try {
            productInfo = await getProduct(state.id);
            commit("setProductInfo", productInfo);
        } catch (error) {
            console.log(error.response);
            console.log(`Fetching product info failed: ${error}`);
        }

        // Categories
        try {
            const categoryOfProduct = await getCategory(productInfo.category_id);
            commit("setCategoriesOfProduct", [categoryOfProduct]);
        } catch (error) {
            console.log(`Fetching categories of this product failed: ${error}`);
        }

        // Seller username/rating
        try {
            const sellerInfo = await getUserWithPoint(productInfo.seller_id);
            commit("setSellerInfo", sellerInfo);
        } catch (error) {
            console.log(`Fetching seller info failed: ${error}`);
        }

        // Highest bidder username/rating
        try {
            const highestBidderInfo = await getUserWithPoint(productInfo.buyer_id);
            commit("setHighestBidderInfo", highestBidderInfo);
        } catch (error) {
            console.log(`Fetching highest bidder info failed: ${error}`);
        }

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

        // Images
        try {
            let productImages = await getProductImage(state.id);
            // Turn relative paths to absolute paths
            productImages = productImages.map((each) => ({
                ...each,
                path: `${IMAGE_API_ENDPOINT}/${each.path}`,
            }));
            // Split into primary and secondary group
            let primaryImage = find(productImages, { is_primary: 1 });
            let secondaryImages = productImages.filter((each) => each.is_primary !== 1);
            commit("setProductImages", { primaryImage, secondaryImages });
        } catch (error) {
            console.log(`Fetching product images failed: ${error}`);
        }

        // Biddings
        try {
            let productBiddings = await getProductBidding(state.id);
            // Expand timestamp, then censor names
            productBiddings = productBiddings.map((each) => ({
                ...each,
                time: toLongTimestamp(each.time),
                full_name: hiddenName(each.full_name),
            }));
            commit("setProductBiddings", productBiddings);
        } catch (error) {
            console.log(`Fetching product biddings failed: ${error}`);
        }

        // Related products
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

        // Is the current product in user's watchlist?
        // Dispatch a getWatchlist call (just in case)
        dispatch("WatchlistModule/fetchAll", { root: true });
        // Filter from watchlistItems
        const isOnWatchlist = find(rootState.WatchlistModule.watchlistItems, { id: state.id }) !== undefined;
        commit("setIsOnWatchlist", isOnWatchlist);

        // Is the current user blocked from bidding on this product?
    },

    appendProductDescription({ commit }, {product_id,description}) {
        try {
            appendDescription(product_id,description)
            commit("appendProductDescriptions", {
                description,
                upload_date: today(),
                isInit: false,
            });
            showSnack("Description appended.");
        } catch (error) {
            showSnack("Description not appended.");
        }
    },
};
