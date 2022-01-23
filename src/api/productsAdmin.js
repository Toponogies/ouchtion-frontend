import axios from "axios";
import { API_ENDPOINTS } from "@/utils/constants";
import { getAuthHeader } from "@/utils/getAuthHeader";

export const getAllProducts = async () => {
    const headers = await getAuthHeader();
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}/admin/products`, { headers })
        .then((res) => res.data)
        .catch(() => []);
};
