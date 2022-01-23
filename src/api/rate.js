import { getAuthHeader } from "@/api/utils/getAuthHeader";
import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";

export async function getRates(payload) {
    const headers = await getAuthHeader();
    return await axios
        .post(`${API_ENDPOINTS.USERS}/rate`, payload, { headers })
        .then(() => true)
        .catch(() => false);
}

export async function getRatesProduct(product_id) {
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}/${product_id}/rate`)
        .then((res) => res.data)
        .catch(() => null);
}
