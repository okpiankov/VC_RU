import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

//@Injectable - чтобы класс можно было переиспользовать в контроллере
//Сервисы выполняют бизнесс-логику и взаимодействуют с БД
//Здесь через методы класса получаю данные разными способами
@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  //Получение всех постов
  //include- получаю связанного с постом автора и select - у него только поле fullName
  //Тип : Promise<Post[]> автоматически подхватился на основе схемы призмы из @prisma/client
  //ставлю Post[] тк хочу получать массив постов
  getPosts(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: {
        author: { select: { fullName: true } },
      },
    });
    // return ['post1', 'post2', 'post3'];
  }

  //Получение поста по id
  getOnePost(id: string): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: { select: { fullName: true } },
      },
    });
  }

  //Получение постов по теме
  getPostsTheme(theme: string): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: { theme },
      include: {
        author: { select: { fullName: true } },
      },
    });
  }

  //Создание поста
  createPost(
    theme: string,
    content: string,
    authorId: string,
    // author: Prisma.UserCreateNestedOneWithoutPostsInput,
    // author: string,
  ) {
    return this.prisma.post.create({ data: { theme, content, authorId } });
  }

  // //Удаление поста
  // deletePost(id: string) {
  //   return this.prisma.post.delete({ where: { id } });
  // }

  // //Обновление поста
  // updatePost(id: string, theme: string, content: string) {
  //   return this.prisma.post.update({
  //     where: { id },
  //     data: { theme, content },
  //   });
  // }
}
