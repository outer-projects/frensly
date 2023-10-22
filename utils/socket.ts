import React from "react";
import { io } from "socket.io-client";
import { isDevelopment } from "./config";

export const socket = io(isDevelopment ? "wss://frensly.adev.co" : 'wss://frensly.io' as string, {
  transports: ["websocket"],
  withCredentials: true,
  path: "/api/v1/ws/",
});
export const SocketContext = React.createContext(socket);
