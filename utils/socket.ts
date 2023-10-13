import React from "react";
import { io } from "socket.io-client";

export const socket = io("https://frensly.adev.co" as string, {
  withCredentials: true,
  path: "/api/v1/socket.io",
});
export const SocketContext = React.createContext(socket);
