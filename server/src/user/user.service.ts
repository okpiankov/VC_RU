import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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

  //Регистрация пользователя
  createUser(fullName: string, email: string, password: string, role: string) {
    return this.prisma.user.create({
      data: { fullName, email, password, role },
    });
  }
}
