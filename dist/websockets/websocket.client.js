"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)('http://localhost:3000');
socket.on('connect', () => {
    console.log('Connected to WebSocket server');
    setInterval(() => {
        const jsonMessage = {
            type: 'json',
            data: { message: `Hello from client ${socket.id}!` },
        };
        socket.emit('message', jsonMessage);
        const textMessage = `Client ${socket.id} sending text message at ${new Date()}`;
        socket.emit('message', { type: 'text', data: textMessage });
    }, 10000);
});
socket.on('message', (data) => {
    console.log(data);
});
socket.on('heartbeat', (message) => {
    console.log(`Heartbeat from server: ${message}`);
});
socket.on('broadcast', (data) => {
    console.log(`${data.sender}: ${data.message}`);
});
socket.on('response', (data) => {
    console.log(`${data.message}`);
});
socket.on('error', (error) => {
    console.error(`Error from server: ${error.message}`);
});
socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
});
//# sourceMappingURL=websocket.client.js.map