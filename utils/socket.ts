
import React from 'react';
import { io } from 'socket.io-client'

export const socket = io('/api/v1/socket.io' as string ,{  
    withCredentials: true
});
export const SocketContext = React.createContext(socket);
