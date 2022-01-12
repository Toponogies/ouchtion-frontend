import actions from "./actions";
import mutations from "./mutations";

export const BiddingModule = {
    namespaced: true,

    state: {
        allBiddings: [],
    },

    actions,
    mutations,
};
