import { jwtVerify } from "jose";
import { JWT_SECRET } from "@/utils/constants";

export const jwtGetPayload = async (jwt) => {
    try {
        const { payload } = await jwtVerify(jwt, new TextEncoder().encode(JWT_SECRET));
        return payload;
    } catch (_) {
        return null;
    }
};
