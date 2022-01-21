import axios from "axios";
import { showSnack } from "@/utils/showSnack";
import { API_ENDPOINTS } from "@/utils/constants";
import { findIndex } from "lodash-es";

export default {
    async fetchAll({ commit }) {
        try {
            const categories = await axios.get(`${API_ENDPOINTS.CATEGORIES}`).then((res) => {
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
            const newCategory = await axios.post(`${API_ENDPOINTS.CATEGORIES}`, payload, { headers }).then((res) => {
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
            const newCategory = await axios.post(`${API_ENDPOINTS.CATEGORIES}`, payload, { headers }).then((res) => {
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

    async edit({ commit, state, rootState }, { id, name }) {
        try {
            // get current category object from given id
            const targetIndex = findIndex(state.categories, { category_id: id });
            const parent_category_id = state.categories[targetIndex].parent_category_id;

            // call API
            const payload = {
                parent_category_id,
                name,
            };
            const headers = {
                Authorization: "Bearer " + rootState.AuthModule.accessToken,
            };
            const success = await axios
                .put(`${API_ENDPOINTS.CATEGORIES}/${id}`, payload, { headers })
                .then(() => true)
                .catch((err) => {
                    console.log(err);
                    return false;
                });
            if (!success) throw new Error();

            // commit to store
            commit("edit", { id, name });
            showSnack(`Item edited, id = ${id}, name = ${name}`);
        } catch (error) {
            console.log(error);
            showSnack("Failed to edit category");
        }
    },

    async remove({ commit, rootState }, id) {
        try {
            // call API
            const headers = {
                Authorization: "Bearer " + rootState.AuthModule.accessToken,
            };
            await axios.delete(`${API_ENDPOINTS.CATEGORIES}/${id}`, { headers });

            // commit to store
            commit("remove", id);
            showSnack(`Item removed, id = ${id}`);
        } catch (error) {
            console.log(error);
            showSnack("Failed to remove category");
        }
    },
};
