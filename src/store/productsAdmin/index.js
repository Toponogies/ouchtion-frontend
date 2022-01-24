import actions from "./actions";
import mutations from "./mutations";

const defaultState = () => ({
    isLoading: false,
    productsHeaders: [
        { text: "Image", value: "primaryImage", sortable: false, width: "96px" }, // 64 + 2*16 = 96
        { text: "Product Name", value: "name" },
        { text: "Ends at", value: "endTime" },
        { text: "Price (\u20AB)", value: "highestBidPrice" },
        { value: "isSold" },
        { text: "Actions", value: "actions", sortable: false, align: "end" },
    ],
    products: [],
});

export const ProductsAdminModule = {
    namespaced: true,

    state: defaultState(),

    actions,

    mutations: {
        ...mutations,
        clearAll(state) {
            Object.assign(state, defaultState());
        },
    },
};
