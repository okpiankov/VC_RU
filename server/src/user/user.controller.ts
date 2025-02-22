import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  //@UseGuards(AuthGuard('jwt'))-проверка токена через Guard или через декоратор @Auth('admin')
  findUser(@Body('email') email: string, @Body('password') password: string) {
    return this.userService.findUser(email, password);
  }

  @Post('registration')
  createUser(
    @Body('fullName') fullName: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ) {
    return this.userService.createUser(fullName, email, password, role);
  }
}
