import { getAuthHeader } from "@/api/utils/getAuthHeader";
import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";

export const getAllProducts = async () => {
    const headers = await getAuthHeader();
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}/admin/products`, { headers })
        .then((res) => res.data)
        .catch(() => []);
};
