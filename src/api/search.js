import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";

export async function getTotal(keyword, category, sort) {
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}`, {
            params: {
                query: keyword,
                category: category,
                sort: sort,
            },
        })
        .then((response) => {
            return response.data;
        });
}

export async function getData(params) {
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}`, {
            params: params,
        })
        .then((response) => {
            return response.data;
        });
}
