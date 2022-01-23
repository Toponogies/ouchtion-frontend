import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";
import { getAuthHeader } from "@/utils/getAuthHeader";

export async function getWatchList() {
    const headers = await getAuthHeader();
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}/bidders/watchlist`, { headers })
        .then((res) => res.data)
        .catch(() => null);
}

export async function addToWatchlist(product_id) {
    const headers = await getAuthHeader();
    const payload = {
        product_id: product_id + "",
    };
    console.log(payload);
    return await axios
        .post(`${API_ENDPOINTS.PRODUCTS}/bidders/watchlist`, payload, { headers })
        .then(() => true)
        .catch(() => false);
}

export async function removeFromWatchlist(product_id) {
    const headers = await getAuthHeader();
    const payload = {
        product_id: product_id + "",
    };
    console.log(payload);
    return await axios
        .delete(`${API_ENDPOINTS.PRODUCTS}/bidders/watchlist`, { headers, data: payload })
        .then(() => true)
        .catch(() => false);
}
