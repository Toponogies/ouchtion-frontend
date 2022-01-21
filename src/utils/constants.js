/* Environment constants */
export const APP_TITLE = process.env.VUE_APP_TITLE;
export const API_ENDPOINT_BASE = process.env.VUE_APP_API_ENDPOINT_BASE;
export const IMAGE_API_ENDPOINT = process.env.VUE_APP_IMAGE_API_ENDPOINT;
export const JWT_SECRET = process.env.VUE_APP_JWT_SECRET;

/* API endpoints */
export const API_ENDPOINTS = {
    AUTH: `${API_ENDPOINT_BASE}/auth`,
    USERS: `${API_ENDPOINT_BASE}/users`,
    CATEGORIES: `${API_ENDPOINT_BASE}/categories`,
    PRODUCTS: `${API_ENDPOINT_BASE}/products`,
    BIDDINGS: `${API_ENDPOINT_BASE}/biddings`,
    ADMIN: `${API_ENDPOINT_BASE}/admin`,
};

/* User roles */
export const ROLES = {
    BIDDER: "bidder",
    SELLER: "seller",
    ADMIN: "admin",
};

/* Home settings */
export const HOME_FEATURED_PRODUCTS_LIMIT = 8;

/* Search types & settings */
export const SEARCH_TYPES = {
    KEYWORD: "keyword",
    CATEGORY: "category",
};
export const SEARCH_BOX_FEATURED_CATEGORIES_LIMIT = 6;
export const SEARCH_RESULTS_PER_PAGE = 10;
export const SEARCH_PAGINATION_VISIBLE_PAGES = 7;

/* Time threshold for modifying appearance of product listings
 * (e.g. show "New" badge, change countdown type, etc.)
 */
export const DELTA_THRESHOLD_START_SHOW_BADGE = 21600; // 6 hours
export const DELTA_THRESHOLD_END_SHOW_DAYS = 259200; // 3 days
export const DELTA_THRESHOLD_END_SHOW_TIME = 86400; // 1 day

/* Comment string for "Bidder did not pay" button */
export const BIDDER_NOT_PAY_COMMENT = "Người thắng không thanh toán";
