import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";

export async function getCategory(id) {
    return await axios.get(`${API_ENDPOINTS.CATEGORIES}/${id}`).then((res) => {
        return res.data;
    });
}

export async function getCategories() {
    return await axios.get(`${API_ENDPOINTS.CATEGORIES}`).then((res) => {
        return res.data;
    });
}

export async function removeCategory(id, headers) {
    return await axios.delete(`${API_ENDPOINTS.CATEGORIES}/${id}`, { headers });
}

export async function editCategory(id, payload, headers) {
    return await axios.put(`${API_ENDPOINTS.CATEGORIES}/${id}`, payload, { headers });
}

export async function createCategory(payload, headers) {
    return axios.post(`${API_ENDPOINTS.CATEGORIES}`, payload, { headers }).then((res) => {
        return res.data;
    });
}
