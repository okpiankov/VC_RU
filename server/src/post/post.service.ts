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
  getPosts(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: {
        author: { select: { fullName: true } },
      },
    });
    // return ['post1', 'post2', 'post3'];
  }

  //Создание поста
  createPost(
    title: string,
    content: string,
    authorId: string,
    // author: Prisma.UserCreateNestedOneWithoutPostsInput,
    // author: string,
  ) {
    return this.prisma.post.create({ data: { title, content, authorId } });
  }

  //Обновление поста
  updatePost(id: string, title: string, content: string) {
    return this.prisma.post.update({
      where: { id },
      data: { title, content },
    });
  }
  //Удаление поста
  deletePost(id: string) {
    return this.prisma.post.delete({ where: { id } });
  }
}
