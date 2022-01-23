import { getProduct, getProductRelate } from "@/api/product";
import { getUserWithPoint } from "@/api/user";
import { getSingleCategory } from "@/utils/categoryUtils";
import { IMAGE_API_ENDPOINT } from "@/utils/constants";

export default {
    setProductId({ commit }, id) {
        commit("setProductId", parseInt(id));
    },

    getAllInfo({ commit, dispatch }) {
        // dispatch in this module
        commit("setLoading", true);
        dispatch("getProductInfo");
        dispatch("getSellerInfo");
        dispatch("getHighestBidderInfo");
        dispatch("getRelatedProducts");
        commit("setLoading", false);

        // dispatch in other modules
        dispatch("CurrentProductDescriptionsModule/getItems", null, { root: true });
        dispatch("CurrentProductImagesModule/getItems", null, { root: true });
        dispatch("CurrentProductBiddingsModule/getItems", null, { root: true });
    },

    async getProductInfo({ commit, state }) {
        let productInfo = await getProduct(state.id);
        let category = getSingleCategory(state.categoryId);

        if (productInfo) {
            commit("setProductInfo", productInfo);
            commit("setCategories", [category]);
        } else {
            console.log(`Failed to get product info for id ${state.id}`);
        }
    },

    async getSellerInfo({ commit, state }) {
        let sellerInfo = await getUserWithPoint(state.seller.id);
        if (sellerInfo) {
            commit("setSellerInfo", sellerInfo);
        } else {
            console.log(`Failed to get seller info for product id ${state.id}`);
        }
    },

    async getHighestBidderInfo({ commit, state }) {
        let highestBidderInfo = await getUserWithPoint(state.bid.highestUser.id);
        if (highestBidderInfo) {
            commit("setHighestBidderInfo", highestBidderInfo);
        } else {
            console.log(`Failed to get highest bidder info for product id ${state.id}`);
        }
    },

    async getRelatedProducts({ commit, state }) {
        let relatedProducts = await getProductRelate(state.category_id);
        if (relatedProducts) {
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
        } else {
            console.log(`Failed to get related products for product id ${state.id}`);
        }
    },
};
