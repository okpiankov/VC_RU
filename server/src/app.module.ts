// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { LoggerMiddleware } from './conception/middleware';
import { UserModule } from './user/user.module';

//Модули группируют связанные элементы, это корневая история
//В рутовый модуль ипортируются дочерние модули
//Сервисы прокидываются в провайдеры
@Module({
  imports: [PostModule, UserModule],
  //controllers: [AppController],
  //providers: [AppService],
})

// export class AppModule {}

//Подключаю Middleware
//Но Авторизацию лучше обрабатывать через Guards, а не через Middleware
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('posts');
  }
}
