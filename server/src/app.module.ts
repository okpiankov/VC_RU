// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { LoggerMiddleware } from './conception/middleware';
import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommentModule } from './comment/comment.module';
// import { WebsocketGateway } from './websocket.gateway';
import { ChatModule } from './chat/chat.module';

//Модули группируют связанные элементы, это корневая история
//В рутовый модуль ипортируются дочерние модули
//Сервисы прокидываются в провайдеры
@Module({
  imports: [
    //Делаю папку для статичного контента npm install --save @nestjs/serve-static
    //чтобы nest раздавал картинки
    //Обязательно прописать serveRoot: '/uploads'
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),

    ConfigModule.forRoot({ isGlobal: true }),
    PostModule,
    UserModule,
    CommentModule,
    ChatModule, //Websocket чат
  ],
  //providers: [ChatModule] не надо
  //providers: [WebsocketGateway],
  //controllers: [AppController],
})
export class AppModule {}

//Подключаю Middleware
//Но Авторизацию лучше обрабатывать через Guards, а не через Middleware
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('posts');
//   }
// }

//npm i --save @nestjs/config установить и добавить ConfigModule.forRoot() чтобы обращаться к файлу .env
