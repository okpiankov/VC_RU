// import {
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   OnGatewayInit,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Server, Socket } from 'socket.io';

// //У каждого Socket есть свой id
// @WebSocketGateway({
//   cors: {
//     origin: '*',
//   },
// })
// export class WebsocketGateway
//   implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
// {
//   @WebSocketServer() server: Server;

//   afterInit(server: Server) {
//     console.log('WebsocketGateway initialized');
//   }
//   handleConnection(client: Socket, ...args: any[]) {
//     console.log('Client connected:', client.id);
//   }
//   handleDisconnect(client: Socket) {
//     console.log('Client disconnected:', client.id);
//   }
//   //Оформляю подписку
//   @SubscribeMessage('message')
//   handleMessage(@MessageBody() message: string): void {
//     console.log('Message:', message);
//     this.server.emit('message', `Echo: ${message}`);
//   }
//
// }
//red group
