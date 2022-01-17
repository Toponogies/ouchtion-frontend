import { generateCategories } from "@/utils/mockUtils";

export default {
    fetchAll({ commit }) {
        const categories = generateCategories();
        commit("updateCategories", categories);
    },
};
