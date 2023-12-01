import { Socket } from 'socket.io';
import { MessagePayload, ResponseMessage } from './websocket';
export declare function validateMessage(payload: {
    type: string;
    data: any;
}): void;
export declare function broadcastMessage(client: Socket, payload: MessagePayload): void;
export declare function createResponse(client: Socket, payload: MessagePayload): ResponseMessage;
export declare function handleMessageError(client: Socket, error: Error): void;
