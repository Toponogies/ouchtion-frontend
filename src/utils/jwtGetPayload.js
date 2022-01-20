import { jwtVerify } from "jose";
import { JWT_SECRET } from "./constants";

export const jwtGetPayload = async (jwt) => {
    const { payload } = await jwtVerify(jwt, new TextEncoder().encode(JWT_SECRET));
    console.log(payload);
    return payload;
};
