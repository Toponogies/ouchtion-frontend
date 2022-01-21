import axios from "axios";
import { API_ENDPOINTS } from "@/utils/constants";
import { getAuthHeader } from "@/api/utils/getAuthHeader";

export const appendDescription = async (product_id, description, upload_date) => {
    const headers = await getAuthHeader();
    const payload = { description, upload_date };
    return await axios.post(`${API_ENDPOINTS.PRODUCTS}/${product_id}/descriptions`, payload, { headers });
};
