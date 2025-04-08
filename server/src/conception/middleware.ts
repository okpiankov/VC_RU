import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

//Пример Middleware
//Но Авторизацию лучше обрабатывать через Guards, а не через Middleware
//Но можно проверку делать либо через Guards, либо через Middleware
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Middleware working...');
    next();
  }
}
