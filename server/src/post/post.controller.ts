import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'node:fs';
import { Express } from 'express';
import { Request } from 'express';

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

  //Сохранение картинок для постов в папку uploads
  //Ключ 'image' должен совпадать с ключем на клиенте
  @Post('uploads')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (_, __, cb) => {
          if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
          }
          cb(null, 'uploads');
        },
        filename: (_, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { url: `http://localhost:7777/uploads/${file.originalname}` };
  }

  //Чтобы заработало - нужно расположить перед получением всех постов (т.е. getPosts())!!!
  //Получение постов по темам
  @Get()
  getPostsTheme(@Query('theme') theme: string, @Req() request: Request) {
    console.log('controller', theme, request.query);
    return this.postService.getPostsTheme(theme);
  }

  //Получение всех постов
  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  //Получение конкретного поста
  //Обязательно передаю ':id' в @Get если хочу получать данные по конкретному посту через id поста
  @Get(':id')
  getOnePost(@Param('id') id: string) {
    // console.log('controller', id);
    return this.postService.getOnePost(id);
  }

  //Создание поста
  @Post()
  createPost(
    @Body() body: any,
    @Body('theme') theme: string,
    @Body('content') content: string,
    @Body('authorId') authorId: string,
    // @Body('author') author: Prisma.UserCreateNestedOneWithoutPostsInput,
  ) {
    console.log('controller', body);
    return this.postService.createPost(theme, content, authorId);
  }

  ////Удаление поста
  // @Delete('delete/:id')
  // deletePost(@Param('id') id: string) {
  //   return this.postService.deletePost(id);
  // }

  ////Обновление поста
  // @Put('update/:id')
  // updatePost(
  //   @Body('theme') theme: string,
  //   @Body('content') content: string,
  //   @Param('id') id: string,
  // ) {
  //   return this.postService.updatePost(id, theme, content);
  // }
}

// type PostCreateInput = {
//   title: string;
//   content?: string | null;
//   author: Prisma.UserCreateNestedOneWithoutPostsInput;
// };
