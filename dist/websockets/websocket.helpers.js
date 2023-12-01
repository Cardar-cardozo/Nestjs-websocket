"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessageError = exports.createResponse = exports.broadcastMessage = exports.validateMessage = void 0;
function validateMessage(payload) {
    if (!payload || typeof payload.type !== 'string' || !payload.data) {
        throw new Error('Invalid message format');
    }
}
exports.validateMessage = validateMessage;
function broadcastMessage(client, payload) {
    client.broadcast.emit('broadcast', {
        sender: client.id,
        message: `Broadcast from ${client.id}: ${JSON.stringify(payload)}`,
    });
}
exports.broadcastMessage = broadcastMessage;
function createResponse(client, payload) {
    return {
        sender: 'Server',
        message: `Server received your ${payload.type} message from ${client.id}: ${JSON.stringify(payload.data)}`,
    };
}
exports.createResponse = createResponse;
function handleMessageError(client, error) {
    console.error(`Error handling message from ${client.id}: ${error.message}`);
    client.emit('error', {
        message: 'Invalid message format or other error occurred',
    });
}
exports.handleMessageError = handleMessageError;
//# sourceMappingURL=websocket.helpers.js.map