import { UseInterceptors } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';
import { LoggingInterceptor } from "src/logging/logging.interceptor";

interface ChatMessage {
  username: string;
  content: string;
}

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

@UseInterceptors(LoggingInterceptor)
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: ChatMessage): void {
    this.server.emit('message', message);
  }
}
