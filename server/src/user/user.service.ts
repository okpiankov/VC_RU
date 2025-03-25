import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthUserDto, CreateUserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { response } from 'express';

//prisma.user.findUnique  это методы призмы: findUnique,findMany, create, update...
//user - название схемы(таблицы в БД)
//login, registration - методы класса названия придумываю сам
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    //Добавил для работы с токенами и jwt:
    private jwtService: JwtService,
  ) {}

  //Авторизация пользователя с валидацией dto
  async login(dto: AuthUserDto) {
    // console.log('dto_in_service', dto);

    //Проверяю зарегистрирован ли пользователь
    const user = await this.getUserByEmail(dto.email);
    // console.log('user_found', user);

    if (user?.password === undefined)
      throw new UnauthorizedException({ message: 'Неверный логин или пароль' });

    //Сравниваю пароль в запросе с захешированным паролем  из БД
    const isValidPass = await bcrypt.compare(dto.password, user?.password);
    // console.log('isValidPass', isValidPass);
    if (user && isValidPass) {
      const token = this.jwtService.sign(
        { email: user.email, id: user.id },
        //'secret123',
        //process.env.JWT_KEY,
      );
      const newUser = { ...user, token: token };
      return newUser;
    } else {
      throw new UnauthorizedException({ message: 'Неверный логин или пароль' });
    }
  }

  //Регистрация пользователя с валидацией dto
  async registration(dto: CreateUserDto) {
    //Проверяю зарегистрирован ли пользователь
    const candidate = await this.getUserByEmail(dto.email);

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.prisma.user.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        password: hashPassword,
        role: dto.role,
      },
    });
    const token = this.jwtService.sign(
      { email: user.email, id: user.id },
      //'secret123',
      //process.env.JWT_KEY,
    );
    const newUser = { ...user, token: token };
    return newUser;
  }

  //Получение всех пользователей
  getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  //Получение пользователя по его id
  getOneUser(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  //Обновление пользователя
  updateUser(id: string, email: string, fullName: string) {
    return this.prisma.user.update({
      where: { id },
      data: { email, fullName },
    });
  }

  //Удаление пользователя
  deleteUser(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  // //Авторизация пользователя без валидации без dto
  // async login(email: string, password: string): Promise<any> {
  //   //Проверяю зарегистрирован ли пользователь
  //   const user = await this.getUserByEmail(email);
  //   console.log('user_found', user);

  //   //Сравниваю пароль в запросе с захешированным паролем  из БД
  //   if (user?.password === undefined) return;
  //   const isValidPass = await bcrypt.compare(password, user?.password);

  //   console.log('isValidPass', isValidPass);
  //   if (user && isValidPass) {
  //     const token = this.jwtService.sign({ email: user.email, id: user.id });
  //     const newUser = { ...user, token: token };
  //     return newUser;
  //   }
  //   throw new UnauthorizedException({ message: 'Неверный логин или пароль' });
  // }

  // //Регистрация пользователя без валидации без dto
  // async registration(
  //   fullName: string,
  //   email: string,
  //   password: string,
  //   role: string,
  // ) {
  //   const candidate = await this.getUserByEmail(email);

  //   if (candidate) {
  //     throw new HttpException(
  //       'Пользователь с таким email существует',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   const hashPassword = await bcrypt.hash(password, 5);
  //   const user = await this.prisma.user.create({
  //     data: {
  //       fullName: fullName,
  //       email: email,
  //       password: hashPassword,
  //       role: role,
  //     },
  //   });
  //   // const payload = { email: user.email, id: user.id };
  //   const token = this.jwtService.sign({ email: user.email, id: user.id });
  //   const newUser = { ...user, token: token };
  //   return newUser;
  // }

  //Проверка зарегистрирован ли пользователь по уникальному email - это логин
  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    // console.log('getUserByEmail', email);
    return user;
  }

  //Пример sql запроса
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

// //Авторизация пользователя
// login(email: string, password: string) {
//   return this.prisma.user.findUnique({
//     where: { email: 'user@test.com', password: '123' },
//   });
// }
////Авторизация пользователя
// login(dto: AuthUserDto) {
//   console.log('dto', dto);
//   return this.prisma.user.findUnique({
//     where: { email: dto.email },
//   });
// }

// //Регистрация пользователя
// registration(fullName: string, email: string, password: string, role: string) {
//   return this.prisma.user.create({
//     data: { fullName, email, password, role },
//   });
// }

// return this.generateToken(user);
// async generateToken(user: User) {
//   const payload = { email: user.email, id: user.id };
//   return {
//     token: this.jwtService.sign(payload),
//   };
// }

// //Авторизация пользователя с валидацией dto
// async login(dto: AuthUserDto) {
//   console.log('dto_in_service', dto);

//   //Проверяю зарегистрирован ли пользователь
//   const user = await this.getUserByEmail(dto.email);
//   console.log('user_found', user);

//   if (user?.password === undefined)
//     throw new UnauthorizedException({ message: 'Неверный логин или пароль' });

//   //Сравниваю пароль в запросе с захешированным паролем  из БД
//   const isValidPass = await bcrypt.compare(dto.password, user?.password);
//   console.log('isValidPass', isValidPass);
//   if (user && isValidPass) {
//     const token = this.jwtService.sign(
//       { email: user.email, id: user.id },
//       //'secret123',
//       //process.env.JWT_KEY,
//     );
//     // const options = {
//     //   maxAge: 1000 * 60 * 60, // срок жизни 60 минут
//     //   httpOnly: true, // такие куки доступны только для установки сервером недоступны на клиенте в document.cookie
//     //   // signed: true
//     // };
//     // response.cookie('cookieName', token, options);
//     const newUser = { ...user, token: token };
//     return newUser;
//   } else {
//     throw new UnauthorizedException({ message: 'Неверный логин или пароль' });
//   }
// }
