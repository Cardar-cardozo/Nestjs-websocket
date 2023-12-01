// src/websocket.gateway.ts

import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  broadcastMessage,
  createResponse,
  handleMessageError,
  validateMessage,
} from './websocket.helpers';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  private connectedClients: Map<string, Socket> = new Map();

  afterInit() {
    console.log('WebSocket server initialized');

    //Periodically send heartbeat messages to all connected clients
    setInterval(() => {
      this.server.emit('heartbeat', 'Server heartbeat');
    }, 5000);
  }

  handleConnection(client: Socket) {
    // Store the connected client

    console.log(`Client connected: ${client.id}`);
    this.connectedClients.set(client.id, client);

    // Broadcast "heartbeat" message to all connected clients except the new client
    client.broadcast.emit('broadcast', {
      sender: client.id,
      message: 'Server heartbeat',
    });

    client.emit('connection', {
      status: 'connected',
      clientId: client.id,
    });

    client.on('error', (error) => {
      client.emit('serverError', `Error from server: ${error.message}`);
    });
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);

    this.server.emit('disconnection', {
      status: 'disconnected',
      clientId: client.id,
    });
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: { type: string; data: any }): void {
    try {
      validateMessage(payload);
      console.log(`Message received from ${client.id}:`, payload);

      // Send a response back to the client
      this.server.emit('response', createResponse(client, payload));

      broadcastMessage(client, payload);
    } catch (error) {
      handleMessageError(client, error);
    }
  }
}
