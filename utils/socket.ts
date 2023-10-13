import React from "react";
import { io } from "socket.io-client";

export const socket = io("ws://frensly.adev.co" as string, {
  transports: ["websocket"],
  withCredentials: true,
  path: "/api/v1/socket.io/",
});
export const SocketContext = React.createContext(socket);
