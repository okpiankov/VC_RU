import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //Авторизация пользователя
  @Post('login')
  //@UseGuards(AuthGuard('jwt'))-проверка токена через Guard или через декоратор @Auth('admin')
  findUser(@Body('email') email: string, @Body('password') password: string) {
    return this.userService.findUser(email, password);
  }

  ////Регистрация пользователя
  // @Post('registration')
  // createUser(
  //   @Body('fullName') fullName: string,
  //   @Body('email') email: string,
  //   @Body('password') password: string,
  //   @Body('role') role: string,
  // ) {
  //   return this.userService.createUser(fullName, email, password, role);
  // }

  //Регистрация пользователя c валидацией dto
  @Post('registration')
  @UsePipes(new ValidationPipe())
  createUser(
    @Body('fullName') fullName: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
    dto: CreateUserDto,
  ) {
    return this.userService.createUser(dto);
  }
}
