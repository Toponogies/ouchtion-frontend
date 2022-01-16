import { showSnack } from "@/utils/showSnack";

export default {
    fetchAll({ commit }) {
        commit("setLoadingState", true);

        const data = [
            {
                primaryImage: "https://picsum.photos/200",
                id: "1",
                name: "Product name",
                endTime: "2022-01-04T12:34:56.789Z",
                highestBidPrice: 1699000,
            },
        ];
        setTimeout(() => {
            commit("setItems", data);
            commit("setLoadingState", false);
        }, 500);
    },
    removeItem({ commit }, id) {
        commit("setLoadingState", true);

        setTimeout(() => {
            commit("removeItem", id);
            commit("setLoadingState", false);
            showSnack(`Removed item ${id}`);
        }, 250);
    },
};
