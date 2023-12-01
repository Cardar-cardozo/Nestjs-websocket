// eslint-disable-next-line @typescript-eslint/no-var-requires
const WebSocket = require('ws');

const serverUrl = 'ws://localhost:3000/socket.io/?EIO=4&transport=websocket'; // Replace with your WebSocket server URL

const ws = new WebSocket(serverUrl);

ws.on('open', () => {
  console.log('WebSocket client connected');

  // Send a message to the server
  const message = 'Hello, WebSocket server!';
  ws.send(message);
});

ws.on('message', (data) => {
  console.log(`Received message from server: ${data}`);
});

ws.on('close', () => {
  console.log('WebSocket connection closed');
});

ws.on('error', (error) => {
  console.error(`WebSocket error: ${error.message}`);
});
