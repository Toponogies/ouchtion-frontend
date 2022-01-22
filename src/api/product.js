import { API_ENDPOINTS, HOME_FEATURED_PRODUCTS_LIMIT } from "@/utils/constants";
import axios from "axios";

export async function getProduct(product_id) {
    return await axios.get(`${API_ENDPOINTS.PRODUCTS}/${product_id}`).then((response) => {
        return response.data;
    });
}

export async function getProductDescription(product_id) {
    return await axios.get(`${API_ENDPOINTS.PRODUCTS}/${product_id}/descriptions`).then((response) => {
        return response.data;
    });
}

export async function getProductImage(product_id) {
    return await axios.get(`${API_ENDPOINTS.PRODUCTS}/${product_id}/images`).then((response) => {
        return response.data;
    });
}

export async function getProductBidding(product_id) {
    return await axios.get(`${API_ENDPOINTS.PRODUCTS}/${product_id}/biddings`).then((response) => {
        return response.data;
    });
}

export async function getProductRelate(category_id) {
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}`, {
            params: { category: category_id, number: HOME_FEATURED_PRODUCTS_LIMIT },
        })
        .then((response) => {
            return response.data;
        });
}

export async function sellerOnGoingProduct(accessToken) {
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}/sellers/ongoingProducts`, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
        .then((response) => {
            return response.data;
        });
}

export async function sellerFinishedProduct(accessToken) {
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}/sellers/finishedProducts`, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
        .then((response) => {
            return response.data;
        });
}

export async function bidderOngoingProduct(accessToken) {
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}/bidders/ongoingBids`, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
        .then((response) => {
            return response.data;
        });
}

export async function bidderCompleteProduct(accessToken) {
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}/bidders/completedBids`, {
            headers: {
                Authorization: "Bearer " + accessToken,
            },
        })
        .then((response) => {
            return response.data;
        });
}
