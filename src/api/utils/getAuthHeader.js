import store from "@/store";
import { jwtVerify } from "jose";
import { JWT_SECRET } from "@/utils/constants";

export const getAuthHeader = async () => {
    // Get access token from store
    let accessToken = store.state.AuthModule.accessToken;
    let refreshToken = store.state.AuthModule.refreshToken;

    try {
        // Attempt to verify the token
        await jwtVerify(accessToken, new TextEncoder().encode(JWT_SECRET));
    } catch (error) {
        // If the token expired (an exception will be thrown), a new token will be requested
        // If the refresh token itself is expired, return null (to indicate a warning)
        const payload = {
            refresh_token: refreshToken,
        };
        return await axios
            .post(`${API_ENDPOINTS.AUTH}/refresh`, payload)
            .then((res) => {
                accessToken = res.data.accessToken;
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
