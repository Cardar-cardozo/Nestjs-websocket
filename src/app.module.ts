import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websockets/websocket.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [WebsocketGateway],
})
export class AppModule {}
