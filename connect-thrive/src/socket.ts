import { io } from "socket.io-client";

const SOCKET_URL = "https://connecto-2-u3a6.vercel.app";
export const socket = io(SOCKET_URL, {
  autoConnect: true,
});
