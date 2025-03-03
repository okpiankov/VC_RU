import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './user.dto';

//prisma.user.findUnique  это методы призмы: findUnique,findMany, create, update...
//user - название схемы(таблицы в БД)
//findUser, createUser - методы класса названия придумываю сам
@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  //Авторизация пользователя
  findUser(email: string, password: string) {
    return this.prisma.user.findUnique({
      where: { email: 'user@test.com', password: '123' },
    });
  }

  // //Регистрация пользователя
  // createUser(fullName: string, email: string, password: string, role: string) {
  //   return this.prisma.user.create({
  //     data: { fullName, email, password, role },
  //   });
  // }
  //Регистрация пользователя c валидацией
  createUser(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: dto,
    });
  }

  //Prisma как ORM в конечном итоге преобразовывает все запросы к БД в sql запросы
  //Prisma как ORM не может решить всез задач иногда нужно писать sql запросы пример:
  //"+"напрямую обращаюсь к БД больше возможности, "-"" нет типизации и маштабированности
  sqlRequest() {
    return this.prisma
      .$queryRaw` SELECT * FROM User WHERE email = ${'user@test.com'}`;

    // //если бы писал не sql запрос
    // return this.prisma.user.findUnique({
    //   where: {
    //     email: 'user@test.com',
    //   },
    // });
  }
}
