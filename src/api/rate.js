import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";

export async function getRates(accessToken) {
    return await axios
    .get(`${API_ENDPOINTS.USERS}/rate`, {
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    })
    .then((response) => {
        return response.data;
    })
}