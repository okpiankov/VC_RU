import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
// import { Request } from 'express';

//Проверка токена из Cookies через Guard
//Можно глобально установить или декоратор @UseGuards(JwtUserGuard) навесить на эндпоинт контроллера локально
@Injectable()
export class JwtUserGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<{ user?: any; cookies?: { cookieName1?: string } }>();
    try {
      // console.log('request', request);
      //Чтобы исключить ошибку типа с undefined
      const token =
        request?.cookies?.cookieName1 !== undefined
          ? request.cookies.cookieName1
          : '';
      console.log('Cookies:', request?.cookies?.cookieName1);

      const user = this.jwtService.verify<{ token: string }>(token, {
        secret: 'secret123',
      });
      console.log('user', user);
      console.log('request.user', request.user);
      //request.user = user;
      return true;
      //return validateRequest(request);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }
}
// if (context.getType() === 'http') {
// }
//   const authHeader = req.headers.authorization;
//   const bearer = authHeader.split(' ')[0];
//   const token = authHeader.split(' ')[1];
//   if (bearer !== 'Bearer' || !token) {
//     throw new UnauthorizedException({
//       message: 'Пользователь не авторизован',
//     });
//   }
//   const user = this.jwtService.verify(token);
