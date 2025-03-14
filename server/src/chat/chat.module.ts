import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from 'src/prisma.service';

@Module({
  //Возможно controllers: [ChatGateway] не нужно указывать??? добавил так же PrismaService в providers: []
  // controllers: [ChatGateway],
  providers: [ChatGateway, ChatService, PrismaService],
})
export class ChatModule {}
