import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";

export async function getCurrentUser(accessToken, user_id) {
    return await axios
        .get(`${API_ENDPOINTS.USERS}/${user_id}`, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
        .then((response) => {
            return response.data;
        });
}

export async function updateEmailCurrentUser(accessToken, user_id, payload) {
    return await axios
        .post(
            `${API_ENDPOINTS.USERS}` + `/${user_id}/email`,
            {
                ...payload,
            },
            {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            }
        )
        .then(() => {
            return true;
        });
}

export async function updateCurrentUser(accessToken, user_id, payload) {
    return await axios
        .put(
            `${API_ENDPOINTS.USERS}` + `/${user_id}`,
            {
                ...payload,
            },
            {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            }
        )
        .then(() => {
            return true;
        });
}

export async function updatePasswordCurrentUser(accessToken, user_id, payload) {
    return await axios
        .put(
            `${API_ENDPOINTS.USERS}` + `/${user_id}/changePassword`,
            {
                ...payload,
            },
            {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            }
        )
        .then(() => {
            return true;
        });
}

export async function updateEmailWithToken(token) {
    return axios.put(`${API_ENDPOINTS.USERS}` + `/user/email`, { token: token }).then(() => {
        return;
    });
}
