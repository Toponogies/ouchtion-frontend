import { API_ENDPOINTS } from "@/utils/constants";
import axios from "axios";

export async function login(loginData) {
    return await axios
        .post(`${API_ENDPOINTS.AUTH}`, {
            ...loginData,
        })
        .then((res) => {
            return res.data;
        });
}

export async function refresh(refresh_token) {
    return await axios
        .post(`${API_ENDPOINTS.AUTH}` + `/refresh`, {
            refresh_token: refresh_token,
        })
        .then((response) => {
            return response.data;
        });
}

export async function register(registerData) {
    return await axios
        .post(`${API_ENDPOINTS.AUTH}` + `/register`, {
            ...registerData,
        })
        .then(() => {
            return;
        });
}

export async function verify(token) {
    return await axios.post(`${API_ENDPOINTS.AUTH}` + `/verify`, { token: token }).then(() => {
        return;
    });
}

export async function sendResetEmail(email) {
    return await axios.post(`${API_ENDPOINTS.AUTH}` + `/reset`, { email: email }).then(() => {
        return;
    });
}

export async function resetPassword(resetBody) {
    return await axios
        .put(`${API_ENDPOINTS.AUTH}` + `/reset`, {
            ...resetBody,
        })
        .then(() => {
            return;
        });
}
