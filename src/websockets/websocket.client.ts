// src/websocket.client.ts

import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000'); // Replace with your server URL

socket.on('connect', () => {
  console.log('Connected to WebSocket server');

  // Simulate dynamic client behavior
  setInterval(() => {
    const jsonMessage = {
      type: 'json',
      data: { message: `Hello from client ${socket.id}!` },
    };
    socket.emit('message', jsonMessage);

    const textMessage = `Client ${
      socket.id
    } sending text message at ${new Date()}`;
    socket.emit('message', { type: 'text', data: textMessage });
  }, 10000);
});

socket.on('message', (data: string) => {
  console.log(data);
});

socket.on('heartbeat', (message: string) => {
  console.log(`Heartbeat from server: ${message}`);
});

socket.on('broadcast', (data: { sender: string; message: string }) => {
  console.log(`${data.sender}: ${data.message}`);
});

socket.on('response', (data: { sender: string; message: string }) => {
  console.log(`${data.message}`);
});

socket.on('error', (error: { message: string }) => {
  console.error(`Error from server: ${error.message}`);
});

socket.on('disconnect', () => {
  console.log('Disconnected from WebSocket server');
});
