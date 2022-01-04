const roles = {
    BIDDER: "bidder",
    SELLER: "seller",
    ADMIN: "admin",
};

export const HOME_FEATURED_PRODUCTS_LIMIT = 8;

export const SEARCH_BOX_FEATURED_CATEGORIES_LIMIT = 6;
export const SEARCH_RESULTS_PER_PAGE = 10;
export const SEARCH_PAGINATION_VISIBLE_PAGES = 7;

export const DELTA_THRESHOLD_START_SHOW_BADGE = 21600; // 6 hours

export const DELTA_THRESHOLD_END_SHOW_DAYS = 259200; // 3 days
export const DELTA_THRESHOLD_END_SHOW_TIME = 86400; // 1 day

export default {
    ROLES: roles,
};
