import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";

export async function getCategory(id) {
    return await axios.get(`${API_ENDPOINTS.CATEGORIES}/${id}`).then((res) => {
        return res.data;
    });
}