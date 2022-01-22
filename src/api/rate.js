import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";

export async function getRates(payload,headers) {
    return await axios
    .post(`${API_ENDPOINTS.USERS}/rate`, payload, { headers })
    .then(() => true)
    .catch((err) => {
        console.log(err);
        showSnack(`Failed to submit review for product id = ${id}`);
        return false;
    });
}

export async function getRatesProduct(product_id) {
    return await axios
    .get(`${API_ENDPOINTS.PRODUCTS}/${product_id}/rate`)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
        return [];
    });
}