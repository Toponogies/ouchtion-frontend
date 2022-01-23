import { getAuthHeader } from "@/api/utils/getAuthHeader";
import { API_ENDPOINTS, HOME_FEATURED_PRODUCTS_LIMIT } from "@/utils/constants";
import axios from "axios";

export async function getProduct(product_id) {
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}/${product_id}`)
        .then((res) => res.data)
        .catch(() => null);
}

export async function getProductDescription(product_id) {
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}/${product_id}/descriptions`)
        .then((res) => res.data)
        .catch(() => null);
}

export async function getProductImage(product_id) {
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}/${product_id}/images`)
        .then((res) => res.data)
        .catch(() => null);
}

export async function getProductBidding(product_id) {
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}/${product_id}/biddings`)
        .then((res) => res.data)
        .catch(() => null);
}

export async function getProductRelate(category_id) {
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}`, {
            params: { category: category_id, number: HOME_FEATURED_PRODUCTS_LIMIT },
        })
        .then((res) => res.data)
        .catch(() => null);
}

export async function sellerOnGoingProduct() {
    const headers = await getAuthHeader();
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}/sellers/ongoingProducts`, { headers })
        .then((res) => res.data)
        .catch(() => null);
}

export async function sellerFinishedProduct() {
    const headers = await getAuthHeader();
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}/sellers/finishedProducts`, { headers })
        .then((res) => res.data)
        .catch(() => null);
}

export async function bidderOngoingProduct() {
    const headers = await getAuthHeader();
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}/bidders/ongoingBids`, { headers })
        .then((res) => res.data)
        .catch(() => null);
}

export async function bidderCompleteProduct() {
    const headers = await getAuthHeader();
    return await axios
        .get(`${API_ENDPOINTS.PRODUCTS}/bidders/completedBids`, { headers })
        .then((res) => res.data)
        .catch(() => null);
}

export async function addProductData(formData) {
    const headers = {
        ...(await getAuthHeader()),
        "Content-Type": "multipart/form-data",
    };
    return await axios
        .post(`${API_ENDPOINTS.PRODUCTS}`, formData, { headers })
        .then((res) => res.data)
        .catch(() => null);
}

export async function addProductImageData(product_id, formDataImage) {
    const headers = {
        ...(await getAuthHeader()),
        "Content-Type": "multipart/form-data",
    };
    return await axios
        .post(`${API_ENDPOINTS.PRODUCTS}/${product_id}/images`, formDataImage, { headers })
        .then((res) => res.data)
        .catch(() => null);
}

export async function removeProduct(id) {
    const headers = await getAuthHeader();
    return await axios
        .delete(`${API_ENDPOINTS.PRODUCTS}/${id}`, { headers })
        .then(() => true)
        .catch(() => false);
}
