import { AdminProductsDashboardModule } from "@/store/admin/adminProductsDashboard";
import { AdminUpgradeRequestsDashboardModule } from "@/store/admin/adminUpgradeRequestsDashboard";
import { AdminUsersDashboardModule } from "@/store/admin/adminUsersDashboard";
import { BidderDashboardModule } from "@/store/bidder/bidderDashboard";
import { BidderWatchlistModule } from "@/store/bidder/bidderWatchlist";
import { CurrentProductBiddingsModule } from "@/store/currentProduct/currentProductBiddings";
import { CurrentProductDescriptionsModule } from "@/store/currentProduct/currentProductDescriptions";
import { CurrentProductDetailsBidderModule } from "@/store/currentProduct/currentProductDetailsBidder";
import { CurrentProductDetailsSellerModule } from "@/store/currentProduct/currentProductDetailsSeller";
import { CurrentProductImagesModule } from "@/store/currentProduct/currentProductImages";
import { CurrentProductInfoModule } from "@/store/currentProduct/currentProductInfo";
import { CurrentUserModule } from "@/store/currentUser";
import { SellerDashboardModule } from "@/store/seller/sellerDashboard";
import { SellerProductCreatorModule } from "@/store/seller/sellerProductCreator";
import { CategoryModule } from "@/store/shared/categories";
import { HomeModule } from "@/store/shared/home";
import { SearchModule } from "@/store/shared/search";
import { SnackbarModule } from "@/store/shared/snackbar";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// Disable strict mode
// https://github.com/nuxt/nuxt.js/issues/1917#issuecomment-338471402
export const strict = false;

export default new Vuex.Store({
    strict: true,
    modules: {
        AdminProductsDashboardModule,
        AdminUpgradeRequestsDashboardModule,
        AdminUsersDashboardModule,
        BidderDashboardModule,
        BidderWatchlistModule,
        CurrentProductBiddingsModule,
        CurrentProductDescriptionsModule,
        CurrentProductDetailsBidderModule,
        CurrentProductDetailsSellerModule,
        CurrentProductImagesModule,
        CurrentProductInfoModule,
        CurrentUserModule,
        SellerDashboardModule,
        SellerProductCreatorModule,
        CategoryModule,
        HomeModule,
        SearchModule,
        SnackbarModule,
    },
});
