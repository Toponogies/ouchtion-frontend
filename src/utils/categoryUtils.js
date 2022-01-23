import store from "@/store";
import { find } from "lodash-es";

export const getSingleCategory = (id) => {
    const categories = store.state["CategoryModule"].categories;
    return find(categories, { category_id: parseInt(id) });
};

export const getCategoryName = (id) => {
    const categories = store.state["CategoryModule"].categories;
    return find(categories, { category_id: parseInt(id) }).name;
};
