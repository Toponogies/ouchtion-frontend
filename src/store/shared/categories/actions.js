import { createCategory, editCategory, getCategories, removeCategory } from "@/api/category";
import { showSnack } from "@/utils/showSnack";
import { findIndex } from "lodash-es";

export default {
    async getItems({ commit }) {
        commit("setLoading", true);

        let categories = await getCategories();

        if (categories) {
            commit("setItems", categories);
        } else {
            showSnack(`Failed to get category list`);
        }

        commit("setLoading", false);
    },

    async addParent({ commit }, name) {
        commit("setLoading", true);

        let payload = {
            parent_category_id: null,
            name,
        };
        let result = await createCategory(payload);

        if (result) {
            const id = result.category_id;
            commit("addParent", { id, name });
            showSnack(`Parent category added with id = ${id}`);
        } else {
            showSnack("Failed to add category");
        }

        commit("setLoading", false);
    },

    async addChild({ commit }, { parentId, name }) {
        commit("setLoading", true);

        const payload = {
            parent_category_id: parentId,
            name,
        };
        let result = await createCategory(payload);

        if (result) {
            const childId = result.category_id;
            const _parentId = result.parent_category_id;
            commit("addChild", { id: childId, parentId, name });
            showSnack(`Child category added to id = ${_parentId} with id = ${childId}`);
        } else {
            showSnack("Failed to add category");
        }

        commit("setLoading", false);
    },

    async edit({ commit, state }, { id, name }) {
        commit("setLoading", true);

        // get current category object from given id
        const targetIndex = findIndex(state.categories, { category_id: id });
        const parent_category_id = state.categories[targetIndex].parent_category_id;

        // call API
        const payload = {
            parent_category_id,
            name,
        };
        const result = await editCategory(id, payload);

        if (result) {
            commit("edit", { id, name });
            showSnack(`Item edited, id = ${id}, name = ${name}`);
        } else {
            showSnack("Failed to edit category");
        }

        commit("setLoading", false);
    },

    async remove({ commit }, id) {
        commit("setLoading", true);

        let result = await removeCategory(id);

        if (result) {
            commit("remove", id);
            showSnack(`Item removed, id = ${id}`);
        } else {
            showSnack("Failed to remove category");
        }

        commit("setLoading", false);
    },
};
