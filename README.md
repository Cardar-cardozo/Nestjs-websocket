# WebSocket Server with Simulated Client

This project demonstrates a WebSocket server implemented using NestJS along with a simulated client in TypeScript.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node.js package manager)

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Cardar-cardozo/Nestjs-websocket.git
   ```

```bash
cd websocket-server-simulated-client

npm install

npm run start

```

The server will be running at http://localhost:3000.

Connecting with the Simulated Client
The simulated client is included in the project and can be run separately.

Open a new terminal window.

Navigate to the src directory:
The simulated client is included in the project and can be run separately.

Open a new terminal window.

Navigate to the src directory:

```bash
cd src

cd websockets

node websocket.client.js

```

Features
Broadcasting: When a client sends a message, it will be broadcasted to all connected clients.

Message Types: The server and client demonstrate handling different message types, including text and JSON.

Heartbeat: The server sends periodic "heartbeat" messages to all connected clients.

Error Handling: Basic error handling is implemented for scenarios like client disconnection or invalid message formats.

Feel free to explore the code for further understanding and customization.
