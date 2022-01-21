import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";

export async function getWatchList(accessToken) {
    const headers = {
        Authorization: "Bearer " + accessToken,
    };
    return await axios.get(`${API_ENDPOINTS.PRODUCTS}/bidders/watchlist`, { headers }).then((res) => res.data);
}

export async function addToWatchlist(accessToken, product_id) {
    const headers = {
        Authorization: "Bearer " + accessToken,
    };
    const payload = {
        product_id,
    };
    return await axios.post(`${API_ENDPOINTS.PRODUCTS}/bidders/watchlist`, payload, { headers });
}

export async function removeFromWatchlist(accessToken, product_id) {
    const headers = {
        Authorization: "Bearer " + accessToken,
    };
    const payload = {
        product_id,
    };
    return await axios.delete(`${API_ENDPOINTS.PRODUCTS}/bidders/watchlist`, payload, { headers });
}
