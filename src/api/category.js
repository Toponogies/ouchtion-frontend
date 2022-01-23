import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";
import { getAuthHeader } from "@/utils/getAuthHeader";

export async function getCategory(id) {
    return await axios
        .get(`${API_ENDPOINTS.CATEGORIES}/${id}`)
        .then((res) => res.data)
        .catch(() => null);
}

export async function getCategories() {
    return await axios
        .get(`${API_ENDPOINTS.CATEGORIES}`)
        .then((res) => res.data)
        .catch(() => null);
}

export async function removeCategory(id) {
    const headers = await getAuthHeader();
    return await axios
        .delete(`${API_ENDPOINTS.CATEGORIES}/${id}`, { headers })
        .then(() => true)
        .catch(() => false);
}

export async function editCategory(id, payload) {
    const headers = await getAuthHeader();
    return await axios
        .put(`${API_ENDPOINTS.CATEGORIES}/${id}`, payload, { headers })
        .then(() => true)
        .catch(() => false);
}

export async function createCategory(payload) {
    const headers = await getAuthHeader();
    return axios
        .post(`${API_ENDPOINTS.CATEGORIES}`, payload, { headers })
        .then((res) => res.data)
        .catch(() => null);
}
