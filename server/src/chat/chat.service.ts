import { Injectable } from '@nestjs/common';
import { Message, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

// type MessageUpdatePayload = Prisma.MessageWhereUniqueInput &
//   Pick<Prisma.MessageUpdateInput, 'text'>;

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  // получение всех сообщений
  async getMessages(): Promise<Message[]> {
    return this.prisma.message.findMany();
  }

  // создание сообщения
  async createMessage(data: Prisma.MessageCreateInput) {
    return this.prisma.message.create({ data });
  }

  // удаление всех сообщений
  async clearMessages(): Promise<Prisma.BatchPayload> {
    return this.prisma.message.deleteMany();
  }

  // // обновление сообщения
  // async updateMessage(payload: MessageUpdatePayload) {
  //   const { id, text } = payload;
  //   return this.prisma.message.update({ where: { id }, data: { text } });
  // }

  // // удаление сообщения
  // async removeMessage(where: Prisma.MessageWhereUniqueInput) {
  //   return this.prisma.message.delete({ where });
  // }
}
