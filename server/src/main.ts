import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// import { ValidationPipe } from '@nestjs/common';
// import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  // app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: true, credentials: true });
  await app.listen(process.env.PORT ?? 7777);
}
void bootstrap();

//В корневом файле настроивается cors и cookies можно глобальный путь указать:
//app.setGlobalPrefix('api')
//nodemon для nestjs не нужен из коробки запуск сервера командой npm run start:dev
//Orm Prizma позволяет удобно работать с БД через обращение к объекту через точку и готовая готовая типизация из коробки

//nest g res название(user,post,product...) --no-spec - создание сразу папки с модулем контролером и сервисом,
//удобно сразу обновляются все импорты во всем приложени и рутовом модуле
//В nest js можно интегрировать микросервисы, graphql, вебсокеты очень широкая функциональность
//graphql - нет разделения на get post запросы..., всегда 1 "post" запрос на все операции
//Удобная фишка что запрос=ответу,какие конкретно укажу поля в запросе только те и придут с сервера
//За счет этого и размер запроса сокращается и грузится быстрее. GraphQL playground -удобный интерфейс
//Apollo для GraphQL - аналог React Query только для graphql с лучшим кешированием

// useContainer(app.select(AppModule), {
//   fallbackOnErrors: true,
// });
