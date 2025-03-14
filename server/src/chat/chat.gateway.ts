import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Prisma } from '@prisma/client';
import { Server, Socket } from 'socket.io';
// import { MessageUpdatePayload } from "types";
// import { AppService } from './app.service';
import { ChatService } from './chat.service';

// type MessageUpdatePayload = Prisma.MessageWhereUniqueInput &
//   Pick<Prisma.MessageUpdateInput, 'text'>;
const users: Record<string, string> = {};

//Чат на отдельном порту 5555 от основного приложения 7777
@WebSocketGateway(5555, {
  cors: {
    origin: '*',
  },
  serveClient: false,
  namespace: 'chat',
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    // console.log('WebsocketGateway initialized', server);
  }

  // подключение
  // handleConnection(client: Socket, ...args: any[]) {
  handleConnection(client: Socket) {
    const userName = client.handshake.query.userName as string;
    const socketId = client.id;
    users[socketId] = userName;

    // console.log('client.handshake', client.handshake)
    // console.log('client.handshake', client)
    // передаю информацию всем клиентам, кроме текущего
    client.broadcast.emit('log', `${userName} connected`);
    console.log('Client connected,socket.id:', client.id);
  }

  // отключение
  handleDisconnect(client: Socket) {
    const socketId = client.id;
    const userName = users[socketId];
    delete users[socketId];

    client.broadcast.emit('log', `${userName} disconnected`);
    console.log('Client disconnected,socket.id:', client.id);
  }

  // получение всех сообщений
  @SubscribeMessage('messages:get')
  async handleMessagesGet(): Promise<void> {
    const messages = await this.chatService.getMessages();
    this.server.emit('messages', messages);
    // console.log('messages:get', messages);
  }

  // создание сообщения
  @SubscribeMessage('message:post')
  async handleMessagePost(
    @MessageBody()
    payload: // { userId: string, userName: string, text: string }
    Prisma.MessageCreateInput,
  ): Promise<void> {
    const createdMessage = await this.chatService.createMessage(payload);
    // можно сообщать клиентам о каждой операции по отдельности
    // this.server.emit('message:post', createdMessage);
    // а можно проще
    await this.handleMessagesGet();
    console.log('message:post', createdMessage);
  }

  // удаление всех сообщений
  @SubscribeMessage('messages:clear')
  async handleMessagesClear(): Promise<void> {
    await this.chatService.clearMessages();
  }

  // // обновление сообщения
  // @SubscribeMessage('message:put')
  // async handleMessagePut(
  //   @MessageBody()
  //   payload: // { id: number, text: string }
  //   MessageUpdatePayload,
  // ): Promise<void> {
  //   const updatedMessage = await this.chatService.updateMessage(payload);
  //   this.server.emit('message:put', updatedMessage);
  //   this.handleMessagesGet();
  // }

  // // удаление сообщения
  // @SubscribeMessage('message:delete')
  // async handleMessageDelete(
  //   @MessageBody()
  //   payload: // { id: number }
  //   Prisma.MessageWhereUniqueInput,
  // ) {
  //   const removedMessage = await this.chatService.removeMessage(payload);
  //   this.server.emit('message:delete', removedMessage);
  //   this.handleMessagesGet();
  // }
}
