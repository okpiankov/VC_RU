import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  //Получение всех комментариев
  getComments(): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      include: {
        author: { select: { fullName: true } },
      },
    });
  }

  //Получение комментариев относящихся к конкретному 1 посту по postId
  getCommentsPost(postId: string): Promise<Comment[] | null> {
    return this.prisma.comment.findMany({
      where: { postId },
      include: {
        author: { select: { fullName: true, id: true } },
      },
    });
  }

  //Получение комментариев  по id автора
  getUserСomments(id: string): Promise<Comment[] | null> {
    return this.prisma.comment.findMany({
      where: {
        authorId: id,
      },
      include: {
        author: { select: { fullName: true } },
        post: { select: { id: true, content: true } },
      },
    });
  }

  //Создание комментария
  createСomment(
    text: string,
    authorId: string,
    postId: string,
    // author: Prisma.UserCreateNestedOneWithoutPostsInput,
    // author: string,
  ) {
    return this.prisma.comment.create({ data: { text, authorId, postId } });
  }

  //Удаление комментария
  deleteСomment(id: string) {
    return this.prisma.comment.delete({ where: { id } });
  }
}
