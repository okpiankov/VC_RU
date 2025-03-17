import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtUserGuard } from 'src/user/jwt-user.guard';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  //Получение всех комментариев
  @Get()
  getСomments() {
    return this.commentService.getComments();
  }

  //Получение комментариев  по id автора
  @Get('authorId')
  getUserСomments(@Query('id') id: string) {
    // console.log('controller_userСomments', id)
    return this.commentService.getUserСomments(id);
  }

  //Получение комментариев относящехся к конкретному 1 посту
  @Get(':postId')
  getСommentsPost(@Param('postId') postId: string) {
    console.log('controller_getCommentsPost', postId);
    return this.commentService.getCommentsPost(postId);
  }

  //Создание комментария
  @UseGuards(JwtUserGuard) //пример использования защитника для эндпоинта
  @Post()
  createСomment(
    @Body() body: any,
    @Body('text') text: string,
    @Body('authorId') authorId: string,
    @Body('postId') postId: string,
    // @Body('author') author: Prisma.UserCreateNestedOneWithoutPostsInput,
  ) {
    console.log('controller_create_comment', body);
    return this.commentService.createСomment(text, authorId, postId);
  }

  //Удаление комментария
  @Delete('delete/:id')
  deletePost(@Param('id') id: string) {
    return this.commentService.deleteСomment(id);
  }
}
