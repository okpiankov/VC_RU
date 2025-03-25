import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { JwtUserGuard } from 'src/user/jwt-user.guard';
import { ChatService } from './chat.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly chatService: ChatService) {}

  //Получение всех сообщений для админки
  @UseGuards(JwtUserGuard)
  @Get()
  async getMessages() {
    return await this.chatService.getMessages();
  }

  //Удаление сообщения по id в админке
  @UseGuards(JwtUserGuard)
  @Delete('delete/:id')
  deleteMessageId(@Param('id') id: string) {
    return this.chatService.deleteMessageId(id);
  }
}
