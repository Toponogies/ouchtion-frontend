import axios from "axios";
import { API_ENDPOINTS } from "@/utils/constants";
import { getAuthHeader } from "./utils/getAuthHeader";

export const placeBids = async (product_id, bid_price) => {
    const headers = await getAuthHeader();
    const payload = { product_id, bid_price };
    return await axios
        .post(`${API_ENDPOINTS.BIDDINGS}`, payload, { headers })
        .then(() => true)
        .catch(() => false);
};

// AUTO BID:
export const turnOnAutoBid = async (product_id, max_price) => {
    const headers = await getAuthHeader();
    const payload = { product_id, max_price };
    return await axios
        .post(`${API_ENDPOINTS.BIDDINGS}/autoBidding`, payload, { headers })
        .then(() => true)
        .catch(() => false);
};

// ⚠️ AUTO BID/OFF
export const turnOffAutoBid = async (product_id) => {
    const headers = await getAuthHeader();
    const payload = { product_id };
    return await axios
        .post(``, payload, { headers })
        .then(() => true)
        .catch(() => false);
};

// BUY NOW
export const buyProductNow = async (product_id) => {
    const headers = await getAuthHeader();
    const payload = { product_id };
    return await axios
        .post(`${API_ENDPOINTS.BIDDINGS}/buyProducts`, payload, { headers })
        .then(() => true)
        .catch(() => false);
};

// BIDDER/SEND REQUESTS
export const sendBidRequest = async (product_id) => {
    const headers = await getAuthHeader();
    const payload = { product_id };
    return await axios
        .post(`${API_ENDPOINTS.BIDDINGS}/bidders/biddingRequests`, payload, { headers })
        .then(() => true)
        .catch(() => false);
};

// ⏳ SELLER/GET ALL REQUESTS
// returns [{ request_id, user_id, product_id }]
export const getAllBidRequests = async (product_id) => {
    const headers = await getAuthHeader();
    const payload = { product_id };
    return await axios
        .get(`${API_ENDPOINTS.BIDDINGS}/sellers/biddingRequests`, payload, { headers })
        .then((res) => res.data)
        .catch(() => null);
};

// ⏳ SELLER/ACCEPT REQUEST
export const acceptBidRequest = async (request_id, user_id, product_id) => {
    const headers = await getAuthHeader();
    const payload_biddingRequests = {
        is_processed: true,
    };
    const result_biddingRequests = await axios
        .put(`${API_ENDPOINTS.BIDDINGS}/sellers/biddingRequests/${request_id}`, payload, { headers })
        .then(() => true)
        .catch(() => false);

    const payload_biddingPermissions = {
        product_id,
        user_id,
        type: "APPROVE",
    };
    const result_biddingPermissions = await axios
        .post(`${API_ENDPOINTS.BIDDINGS}/sellers/biddingPermissions`, payload_biddingPermissions, { headers })
        .then(() => true)
        .catch(() => false);

    return result_biddingRequests && result_biddingPermissions;
};

// ⏳ SELLER/REJECT REQUEST (warning: reject permanently)
export const rejectBidRequest = async (request_id, user_id, product_id) => {
    const headers = await getAuthHeader();
    const payload_biddingRequests = {
        is_processed: false,
    };
    const result_biddingRequests = await axios
        .put(`${API_ENDPOINTS.BIDDINGS}/sellers/biddingRequests/${request_id}`, payload, { headers })
        .then(() => true)
        .catch(() => false);
    const payload_biddingPermissions = {
        product_id,
        user_id,
        type: "REJECT",
    };
    const result_biddingPermissions = await axios
        .post(`${API_ENDPOINTS.BIDDINGS}/sellers/biddingPermissions`, payload_biddingPermissions, { headers })
        .then(() => true)
        .catch(() => false);
    return result_biddingRequests && result_biddingPermissions;
};

// SELLER/REJECT BIDDING (warning: reject permanently)
export const blockBidder = async (bid_id) => {
    const headers = await getAuthHeader();
    return await axios
        .post(`${API_ENDPOINTS.BIDDINGS}/sellers/biddingRequests/${bid_id}`, { headers })
        .then(() => true)
        .catch(() => false);
};
