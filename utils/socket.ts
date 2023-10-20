import React from "react";
import { io } from "socket.io-client";

export const socket = io("wss://frensly.io" as string, {
  transports: ["websocket"],
  withCredentials: true,
  path: "/api/v1/ws/",
});
export const SocketContext = React.createContext(socket);
