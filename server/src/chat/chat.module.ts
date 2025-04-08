import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from '../prisma.service';
// import { PrismaService } from 'src/prisma.service';
import { MessageController } from './messages.controller';

@Module({
  //В controllers: [ChatGateway] не нужно указывать, добавил так же PrismaService в providers: []
  //controllers: [ChatGateway], //не надо
  controllers: [MessageController], //для админки работа с БД
  providers: [ChatGateway, ChatService, PrismaService], //сам чат на WebSocket
})
export class ChatModule {}
