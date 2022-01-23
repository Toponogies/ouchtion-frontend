import { getAuthHeader } from "@/api/utils/getAuthHeader";
import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";

export async function getUpgradeRequests() {
    const headers = await getAuthHeader();
    return await axios
        .get(`${API_ENDPOINTS.USERS}/admin/request`, { headers })
        .then((res) => res.data)
        .catch(() => []);
}

export async function deleteUpgradeRequests(id) {
    const headers = await getAuthHeader();
    return await axios
        .delete(`${API_ENDPOINTS.USERS}` + `/admin/request/${id}`, { headers })
        .then(() => true)
        .catch(() => false);
}

export async function requestSeller(reason) {
    const headers = await getAuthHeader();
    const payload = { reason };
    return await axios
        .post(`${API_ENDPOINTS.USERS}` + `/requestSeller`, payload, { headers })
        .then(() => true)
        .catch(() => false);
}
