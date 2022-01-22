import actions from "./actions";
import mutations from "./mutations";

export const AddProductModule = {
    namespaced: true,

    state: {
        newProductId: null,
    },

    actions,
    mutations,
};
