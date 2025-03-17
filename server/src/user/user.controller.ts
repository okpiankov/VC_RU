import {
  Body,
  Controller,
  Post,
  Res,
  // Response,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthUserDto, CreateUserDto } from './user.dto';
import { Response } from 'express'; //установить "@types/express"

//Можно сделать отдельно контроллеры для: user, auth, role(тк роли хранятся в БД)
//@UseGuards(AuthGuard('jwt'))-проверка токена через Guard или через декоратор @Auth('admin')

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //Авторизация пользователя с валидацией dto
  //Синтаксис такой (@Body() dto: AuthUserDto) без запятой и обязательно @Body() указывать
  @Post('login')
  // @UsePipes(new ValidationPipe({ transform: true }))
  @UsePipes(new ValidationPipe())
  async login(
    @Body() dto: AuthUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    // console.log('dto_in_controller', dto);

    const user = await this.userService.login(dto);
    //Деструктурирую нужные поля из dto пришедшие из userService
    const { token, fullName, id, email, role, createdAt } = user;
    const options = {
      maxAge: 1000 * 60 * 60, // срок жизни 60 минут
      httpOnly: true,
    };
    //Прикрепляю к ответу куки
    response.cookie('cookieName1', token, options);
    return { fullName, id, email, role, createdAt };
  }

  //Регистрация пользователя c валидацией dto
  @Post('registration')
  @UsePipes(new ValidationPipe())
  async registration(
    @Body()
    dto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('dto_in_controller', dto);
    const user = await this.userService.registration(dto);
    //Деструктурирую нужные поля из dto пришедшие из userService
    const { token, fullName, id, email, role } = user;
    const options = {
      maxAge: 1000 * 60 * 60, // срок жизни 60 минут
      httpOnly: true,
    };
    //Прикрепляю к ответу куки
    response.cookie('cookieName2', token, options);
    return { fullName, id, email, role };
  }
}

// //Авторизация пользователя без валидации без dto
// @Post('login')
// findUser(
//   @Body() body: any,
//   @Body('email') email: string,
//   @Body('password') password: string,
// ) {
//   console.log('controller', body);
//   return this.userService.login(email, password);
// }

// //Регистрация пользователя без валидации без dto
// @Post('registration')
// createUser(
//   @Body() body: any,
//   @Body('fullName') fullName: string,
//   @Body('email') email: string,
//   @Body('password') password: string,
//   @Body('role') role: string,
// ) {
//   console.log('controller', body);
//   return this.userService.registration(fullName, email, password, role);
// }

// //Авторизация пользователя с валидацией dto
// //Синтаксис такой (@Body() dto: AuthUserDto) без запятой и обязательно @Body() указывать
// @Post('login')
// // @UsePipes(new ValidationPipe({ transform: true }))
// @UsePipes(new ValidationPipe())
// findUser(
//   @Body() dto: AuthUserDto,
//   // @Res({ passthrough: true }) response: Response,
// ) {
//   console.log('dto_in_controller', dto);
//   // const options = {
//   //   maxAge: 1000 * 60 * 60, // срок жизни 60 минут
//   //   httpOnly: true,
//   // };
//   // response.cookie('cookieName', token, options);
//   return this.userService.login(dto);
// }
