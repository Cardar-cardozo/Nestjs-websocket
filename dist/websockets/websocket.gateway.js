"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const websocket_helpers_1 = require("./websocket.helpers");
let WebsocketGateway = class WebsocketGateway {
    constructor() {
        this.connectedClients = new Map();
    }
    afterInit() {
        console.log('WebSocket server initialized');
        setInterval(() => {
            this.server.emit('heartbeat', 'Server heartbeat');
        }, 5000);
    }
    handleConnection(client) {
        console.log(`Client connected: ${client.id}`);
        this.connectedClients.set(client.id, client);
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
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
        this.connectedClients.delete(client.id);
        this.server.emit('disconnection', {
            status: 'disconnected',
            clientId: client.id,
        });
    }
    handleMessage(client, payload) {
        try {
            (0, websocket_helpers_1.validateMessage)(payload);
            console.log(`Message received from ${client.id}:`, payload);
            this.server.emit('response', (0, websocket_helpers_1.createResponse)(client, payload));
            (0, websocket_helpers_1.broadcastMessage)(client, payload);
        }
        catch (error) {
            (0, websocket_helpers_1.handleMessageError)(client, error);
        }
    }
};
exports.WebsocketGateway = WebsocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebsocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], WebsocketGateway.prototype, "handleMessage", null);
exports.WebsocketGateway = WebsocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)()
], WebsocketGateway);
//# sourceMappingURL=websocket.gateway.js.map