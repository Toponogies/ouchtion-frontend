import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";

export async function getWatchList(accessToken) {
    return await axios
    .get(`${API_ENDPOINTS.PRODUCTS}/bidders/watchlist`, {
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    })
    .then((response) => {
        return response.data;
    })
}

export async function deleteWatchList(accessToken,product_id) {
    return await axios
    .delete(`${API_ENDPOINTS.PRODUCTS}/bidders/watchlist`, {
        headers: {
            Authorization: "Bearer " + accessToken,
        },
        data: {
            product_id: product_id,
        },
    })
}


