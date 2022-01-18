import axios from "axios";
import { showSnack } from "@/utils/showSnack";

export default {
    async fetchAll({ commit }) {
        try {
            const categories = await axios.get("http://localhost:3000/api/categorys").then((response) => {
                return response.data;
            });
            commit("updateCategories", categories);
        } catch (error) {
            console.log(error.response.data);
        }
    },

    addParent({ commit, getters }, name) {
        // get next id (somehow)
        const id = getters.nextCategoryId;
        // API
        commit("addParent", { id, name });
        showSnack(`Parent added, id = ${id}, name = ${name}`);
    },

    addChild({ commit, getters }, { parentId, name }) {
        // get next id (somehow)
        const id = getters.nextCategoryId;
        // API
        commit("addChild", { id, parentId, name });
        showSnack(`Child added, id = ${id}, name = ${name}`);
    },

    edit({ commit }, { id, name }) {
        // API
        commit("edit", { id, name });
        showSnack(`Item edited, id = ${id}, name = ${name}`);
    },

    remove({ commit }, id) {
        // API
        commit("remove", id);
        showSnack(`Item removed, id = ${id}`);
    },
};
