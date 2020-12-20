import { io } from "socket.io-client";

const socketClient = new io('ws://127.0.0.1:8080', {query: 'id=thanhnguyen'});

socketClient.on('connect', (socket) => {
    console.log('WebSocket Client Connected');
});

socketClient.on('disconnect', () => {
    console.log('socket is close, reconnecting');
    // setTimeout(connectToSocket, 5000);
});

export default socketClient;