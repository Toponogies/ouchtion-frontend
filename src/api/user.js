import axios from "axios";
import { API_ENDPOINTS } from "@/utils/constants";

export async function getUserWithPoint(user_id) {
    if (user_id === null) return {
        full_name: "",
        point: 0.0,
    };
    return await axios.get(`${API_ENDPOINTS.USERS}/${user_id}/point`).then((response) => {
        return response.data;
    })
    .catch(() => false);
}

export async function getUser(accessToken, user_id) {
    return await axios
        .get(`${API_ENDPOINTS.USERS}` + `/${user_id}`, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
        .then((response) => {
            return response.data;
        });
}

export async function getAllUser(accessToken) {
    return await axios
        .get(`${API_ENDPOINTS.USERS}`, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
        .then((response) => {
            return response.data;
        });
}

export async function updateUserAdmin(accessToken, id, payload) {
    return await axios
        .put(
            `${API_ENDPOINTS.USERS}/${id}`,
            {
                ...payload,
            },
            {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            }
        )
        .then((response) => {
            return response.data;
        });
}

export async function updatePasswordAdmin(accessToken, id, payload) {
    return await axios
        .put(`${API_ENDPOINTS.USERS}/${id}/changePassword`, payload, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
        .then((res) => res.data);
}

export async function updateEmailAdmin(accessToken, id, payload) {
    return await axios.post(`${API_ENDPOINTS.USERS}/${id}/email`, payload, {
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    });
}

export async function updateRole(accessToken, payload) {
    return await axios
        .put(`${API_ENDPOINTS.USERS}` + `/admin/role`, payload, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
        .then(() => {
            return true;
        });
}

export async function createUser(accessToken, payload) {
    return await await axios
        .post(
            `${API_ENDPOINTS.USERS}`,
            {
                ...payload,
                role: "bidder",
                is_active: "1",
            },
            {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            }
        )
        .then((response) => {
            return response.data;
        });
}
