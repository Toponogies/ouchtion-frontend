import { findIndex } from "lodash-es";

export default {
    setCategories(state, categories) {
        state.categories = categories;
    },

    addParent(state, { id, name }) {
        state.categories.push({
            category_id: id,
            parent_category_id: null,
            name,
        });
    },

    addChild(state, { id, parentId, name }) {
        state.categories.push({
            category_id: id,
            parent_category_id: parentId,
            name,
        });
    },

    // since the category array is flat, there's no need
    // for separate edit/remove parent/child

    edit(state, { id, name }) {
        const targetIndex = findIndex(state.categories, { category_id: id });
        const targetItem = {
            ...state.categories[targetIndex],
            name,
        };
        state.categories.splice(targetIndex, 1, targetItem);
    },

    remove(state, id) {
        const targetIndex = findIndex(state.categories, { category_id: id });
        state.categories.splice(targetIndex, 1);
    },
};
