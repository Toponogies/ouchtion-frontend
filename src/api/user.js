import axios from "axios";
import { API_ENDPOINTS } from "@/utils/constants";
import { getAuthHeader } from "@/utils/getAuthHeader";

export async function getUserWithPoint(user_id) {
    // if (user_id === null)
    //     return {
    //         full_name: "",
    //         point: 0.0,
    //     };
    return await axios
        .get(`${API_ENDPOINTS.USERS}/${user_id}/point`)
        .then((res) => res.data)
        .catch(() => null);
}

export async function getUser(user_id) {
    const headers = await getAuthHeader();
    return await axios
        .get(`${API_ENDPOINTS.USERS}/${user_id}`, { headers })
        .then((res) => res.data)
        .catch(() => null);
}

export async function getAllUser() {
    const headers = await getAuthHeader();
    return await axios
        .get(`${API_ENDPOINTS.USERS}`, { headers })
        .then((res) => res.data)
        .catch(() => null);
}

export async function updateUserAdmin(id, payload) {
    const headers = await getAuthHeader();
    return await axios
        .put(`${API_ENDPOINTS.USERS}/${id}`, payload, { headers })
        .then((res) => res.data)
        .catch(() => null);
}

export async function updatePasswordAdmin(id, password) {
    const headers = await getAuthHeader();
    const payload = {
        new_password: password,
    };
    return await axios
        .put(`${API_ENDPOINTS.USERS}/${id}/changePassword`, payload, { headers })
        .then((res) => res.data)
        .catch(() => null);
}

export async function updateEmailAdmin(id, payload) {
    const headers = await getAuthHeader();
    return await axios
        .post(`${API_ENDPOINTS.USERS}/${id}/email`, payload, { headers })
        .then(() => true)
        .catch(() => false);
}

export async function updateRole({ user_id, role }) {
    const headers = await getAuthHeader();
    const payload = { user_id, role };
    return await axios
        .put(`${API_ENDPOINTS.USERS}/admin/role`, payload, { headers })
        .then(() => true)
        .catch(() => false);
}

export async function createUser(payload) {
    const headers = await getAuthHeader();
    const payload_final = {
        ...payload,
        role: "bidder",
        is_active: "1",
    };
    return await await axios
        .post(`${API_ENDPOINTS.USERS}`, payload_final, { headers })
        .then((res) => res.data)
        .catch(() => null);
}

export async function removeUser(id) {
    const headers = await getAuthHeader();
    return await axios
        .delete(`${API_ENDPOINTS.USERS}/${id}`, null, { headers })
        .then(() => true)
        .catch(() => false);
}
