import store from "@/store";
import { API_ENDPOINTS } from "@/utils/constants";
import { jwtGetPayload } from "@/api/utils/jwtGetPayload";
import axios from "axios";

export const getAuthHeader = async () => {
    // Get access token from store
    let accessToken = store.state.CurrentUserModule.accessToken;
    let refreshToken = store.state.CurrentUserModule.refreshToken;

    // Attempt to verify the token
    let payload = await jwtGetPayload(accessToken);
    if (!payload) {
        // If the token expired (an exception will be thrown), a new token will be requested
        // If the refresh token itself is expired, return null (to indicate a warning)
        const payload = {
            refresh_token: refreshToken,
        };
        return await axios
            .post(`${API_ENDPOINTS.AUTH}/refresh`, payload)
            .then((res) => {
                accessToken = res.data.accessToken;
                localStorage.setItem("accessToken_ouchtion", accessToken);
            })
            .catch(() => {
                refreshToken = null;
            });
    }

    if (!refreshToken) {
        return null;
    } else {
        return {
            Authorization: `Bearer ${accessToken}`,
        };
    }
};
