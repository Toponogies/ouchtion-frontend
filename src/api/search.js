import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";

export async function getResultCount(keyword, category) {
    const payload = {
        params: {
            query: keyword,
            category: category,
        },
    };
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}`, payload)
        .then((res) => res.data)
        .catch(() => null);
}

export async function getResults(params) {
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}`, { params })
        .then((res) => res.data)
        .catch(() => null);
}
