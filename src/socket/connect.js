import socketIOClient from "socket.io-client";
import { SOCKET_ENDPOINT } from "@/utils/constants";

export const socket = socketIOClient(SOCKET_ENDPOINT);
