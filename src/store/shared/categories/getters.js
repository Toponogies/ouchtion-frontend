export default {
    nextCategoryId(state) {
        return Math.max(...state.categories.map((each) => each.category_id)) + 1;
    },
};
