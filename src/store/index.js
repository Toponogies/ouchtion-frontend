import { AdminUpgradeRequestsDashboardModule } from "@/admin/adminUpgradeRequestsDashboard";
import { AdminUsersDashboardModule } from "@/admin/adminUsersDashboard";
import { BidderDashboardModule } from "@/bidder/bidderDashboard";
import { BidderWatchlistModule } from "@/bidder/bidderWatchlist";
import { CurrentProductBiddingsModule } from "@/currentProduct/currentProductBiddings";
import { CurrentProductDescriptionsModule } from "@/currentProduct/currentProductDescriptions";
import { CurrentProductDetailsBidderModule } from "@/currentProduct/currentProductDetailsBidder";
import { CurrentProductDetailsSellerModule } from "@/currentProduct/currentProductDetailsSeller";
import { CurrentProductImagesModule } from "@/currentProduct/currentProductImages";
import { CurrentProductInfoModule } from "@/currentProduct/currentProductInfo";
import { CurrentUserModule } from "@/currentUser";
import { SellerDashboardModule } from "@/seller/sellerDashboard";
import { SellerProductCreatorModule } from "@/seller/sellerProductCreator";
import { CategoryModule } from "@/shared/categories";
import { HomeModule } from "@/shared/home";
import { SearchModule } from "@/shared/search";
import { SnackbarModule } from "@/shared/snackbar";
import { AdminProductsDashboardModule } from "@/store/admin/adminProductsDashboard";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    modules: {
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
        AdminProductsDashboardModule,
    },
});
