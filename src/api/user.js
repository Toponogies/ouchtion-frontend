import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";

export async function getUserWithPoint(user_id) {
    return await axios.get(`${API_ENDPOINTS.USERS}/${user_id}/point`).then((response) => {
        return response.data;
    });
}
