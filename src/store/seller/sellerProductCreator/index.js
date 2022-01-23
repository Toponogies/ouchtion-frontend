import actions from "./actions";
import mutations from "./mutations";

export const SellerProductCreatorModule = {
    namespaced: true,

    state: {
        newProductId: null,
    },

    actions,
    mutations,
};
