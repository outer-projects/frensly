
import React from 'react';
import { io } from 'socket.io-client'

export const socket = io('https://frensly.adev.co/api/v1/socket.io' as string ,{  
    withCredentials: false
});
export const SocketContext = React.createContext(socket);
