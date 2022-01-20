import axios from "axios";
import { showSnack } from "@/utils/showSnack";

export default {
    async fetchAll({ commit }) {
        try {
            const categories = await axios.get("http://localhost:3000/api/categories").then((res) => {
                return res.data;
            });
            commit("setCategories", categories);
        } catch (error) {
            console.log(error);
        }
    },

    async addParent({ commit, rootState }, name) {
        try {
            // call API, then extract new ID
            const headers = {
                Authorization: "Bearer " + rootState.AuthModule.accessToken,
            };
            const payload = {
                parent_category_id: null,
                name,
            };
            const newCategory = await axios
                .post("http://localhost:3000/api/categorys", payload, { headers })
                .then((res) => {
                    return res.data;
                });
            const id = newCategory.category_id;

            // commit to store
            commit("addParent", { id, name });
            showSnack(`Parent category added with id = ${id}`);
        } catch (error) {
            console.log(error);
            showSnack("Failed to add category");
        }
    },

    async addChild({ commit, rootState }, { parentId, name }) {
        try {
            // call API, then extract new ID
            const headers = {
                Authorization: "Bearer " + rootState.AuthModule.accessToken,
            };
            const payload = {
                parent_category_id: parentId,
                name,
            };
            const newCategory = await axios
                .post("http://localhost:3000/api/categorys", payload, { headers })
                .then((res) => {
                    return res.data;
                });
            const childId = newCategory.category_id;
            const _parentId = newCategory.parent_category_id;

            // commit to store
            commit("addChild", { id: childId, parentId, name });
            showSnack(`Child category added to id = ${_parentId} with id = ${childId}`);
        } catch (error) {
            console.log(error);
            showSnack("Failed to add category");
        }
    },

    edit({ commit }, { id, name }) {
        // API
        commit("edit", { id, name });
        showSnack(`Item edited, id = ${id}, name = ${name}`);
    },

    async remove({ commit, rootState }, id) {
        try {
            // call API
            const headers = {
                Authorization: "Bearer " + rootState.AuthModule.accessToken,
            };
            await axios.delete(`http://localhost:3000/api/categorys/${id}`, { headers });

            // commit to store
            commit("remove", id);
            showSnack(`Item removed, id = ${id}`);
        } catch (error) {
            console.log(error);
            showSnack("Failed to remove category");
        }
    },
};
