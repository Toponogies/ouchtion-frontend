import { showSnack } from "@/utils/showSnack";

export default {
    fetchAll({ commit }) {
        commit("setLoadingState", true);

        const data = [
            {
                id: 1,
                primaryImage: "https://picsum.photos/200?random=1",
                name: "Dummy product 1",
                endTime: "2000-01-01T00:00:00.000Z",
                highestBidPrice: 1699000,
            },
            {
                id: 2,
                primaryImage: "https://picsum.photos/200?random=2",
                name: "Dummy product 2",
                endTime: "2000-01-01T00:00:00.000Z",
                highestBidPrice: 1799000,
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
