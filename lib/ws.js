import { io } from "socket.io-client";

const socketClient = new io('ws://localhost:8052', {query: 'id=thanhnguyen'});

socketClient.on('connect', (socket) => {
    console.log('WebSocket Client Connected');
});

socketClient.on('disconnect', () => {
    console.log('socket is close, reconnecting');
    // setTimeout(connectToSocket, 5000);
});

export default socketClient;