import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
// import { PrismaService } from 'src/prisma.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

//Модули группируют связанные элементы, это корневая история
//Сервисы прокидываются в провайдеры
@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService],
})
export class PostModule {}
