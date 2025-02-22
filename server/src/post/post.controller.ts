import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PostService } from './post.service';

//Контроллеры - только обрабатывают HTPP запросы и возвращают ответы и вызывает сервис
//Те принимает данные и отдает данные или ошибку клиенту
//Запрос пришел и контроллер обращается к сервису(весь функционал по получению данных уже в сервисе)
//@ - декораторы специальная функция обертка которая добавляет метаданные к классам и методам(функциям)
//и это позволяет навесить дополнительный функционал(напрмер класс @Controller - делает полноценным контроллером, или на авторизацию - навесить проверку ролей)
//Указываю путь после /  ('posts') - это корневой путь

// Можно указать дополнительный путь в @Get('путь') после корневого 'posts' / ... а можно оставить пустым
// @Get- обычный get запрос, можно использовать любые запросы @GET, @POST, @PATCH, @DELETE
// findAll (@Query) можно передавать квери параметры из запросов с клиента
// или получать тело findAll (@Body) при POST запросе или получать (@Request) и (@Response)

//Контроллер обращается к сервису через класс а точнее к его методам

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }
  @Post()
  createPost(
    @Body('title') title: string,
    @Body('content') content: string,
    @Body('authorId') authorId: string,
    // @Body('author') author: Prisma.UserCreateNestedOneWithoutPostsInput,
  ) {
    return this.postService.createPost(title, content, authorId);
  }
  @Put('update/:id')
  updatePost(
    @Body('title') title: string,
    @Body('content') content: string,
    @Param('id') id: string,
  ) {
    return this.postService.updatePost(id, title, content);
  }
  @Delete('delete/:id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}

// type PostCreateInput = {
//   title: string;
//   content?: string | null;
//   author: Prisma.UserCreateNestedOneWithoutPostsInput;
// };
