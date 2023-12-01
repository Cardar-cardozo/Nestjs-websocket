import { Socket } from 'socket.io';
import { MessagePayload, ResponseMessage } from './websocket';

export function validateMessage(payload: { type: string; data: any }): void {
  if (!payload || typeof payload.type !== 'string' || !payload.data) {
    throw new Error('Invalid message format');
  }
}

export function broadcastMessage(
  client: Socket,
  payload: MessagePayload,
): void {
  client.broadcast.emit('broadcast', {
    sender: client.id,
    message: `Broadcast from ${client.id}: ${JSON.stringify(payload)}`,
  });
}

export function createResponse(
  client: Socket,
  payload: MessagePayload,
): ResponseMessage {
  return {
    sender: 'Server',
    message: `Server received your ${payload.type} message from ${
      client.id
    }: ${JSON.stringify(payload.data)}`,
  };
}

export function handleMessageError(client: Socket, error: Error): void {
  console.error(`Error handling message from ${client.id}: ${error.message}`);

  // Optionally, send an error response to the client
  client.emit('error', {
    message: 'Invalid message format or other error occurred',
  });
}
