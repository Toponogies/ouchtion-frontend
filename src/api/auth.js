import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";

export async function login(loginData) {
    return await axios
        .post(`${API_ENDPOINTS.AUTH}`, loginData)
        .then((res) => res.data)
        .catch(() => null);
}

export async function register(registerData) {
    return await axios
        .post(`${API_ENDPOINTS.AUTH}/register`, registerData)
        .then(() => true)
        .catch(() => false);
}

// verification link from email, not verification on the token itself
export async function verify(token) {
    return await axios
        .post(`${API_ENDPOINTS.AUTH}/verify`, { token })
        .then(() => true)
        .catch(() => false);
}

export async function sendResetEmail(email) {
    return await axios
        .post(`${API_ENDPOINTS.AUTH}/reset`, { email })
        .then(() => true)
        .catch(() => false);
}

export async function resetPassword(resetBody) {
    return await axios
        .put(`${API_ENDPOINTS.AUTH}/reset`, resetBody)
        .then(() => true)
        .catch(() => false);
}
