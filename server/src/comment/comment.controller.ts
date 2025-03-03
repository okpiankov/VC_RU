import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  //Получение всех комментариев
  @Get()
  getСomments() {
    return this.commentService.getComments();
  }

  //Получение комментариев относящехся к конкретному 1 посту
  @Get(':postId')
  getСommentsPost(@Param('postId') postId: string) {
    console.log('controller', postId);
    return this.commentService.getCommentsPost(postId);
  }

  //Создание комментария
  @Post()
  createСomment(
    @Body() body: any,
    @Body('text') text: string,
    @Body('authorId') authorId: string,
    @Body('postId') postId: string,
    // @Body('author') author: Prisma.UserCreateNestedOneWithoutPostsInput,
  ) {
    console.log('controller', body);
    return this.commentService.createСomment(text, authorId, postId);
  }

  //Удаление комментария
  @Delete('delete/:id')
  deletePost(@Param('id') id: string) {
    return this.commentService.deleteСomment(id);
  }
}
