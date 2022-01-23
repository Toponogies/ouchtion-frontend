import { getAuthHeader } from "@/api/utils/getAuthHeader";
import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";

export const appendDescription = async (product_id, description) => {
    const headers = await getAuthHeader();
    const payload = { description };
    return await axios
        .post(`${API_ENDPOINTS.PRODUCTS}/${product_id}/descriptions`, payload, { headers })
        .then(() => true)
        .catch(() => false);
};
