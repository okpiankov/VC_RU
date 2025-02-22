import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // await app.listen(process.env.PORT ?? 7777);
  app.enableCors();
  await app.listen(7777);
}
void bootstrap();
//В корневом файле настроивается cors и cookies можно глобальный путь указать:
//app.setGlobalPrefix('api')
//nodemon для nestjs не нужен из коробки запуск сервера командой npm run start:dev
//Orm Prizma позволяет удобно работать с БД через обращение к объекту через точку и готовая готовая типизация из коробки

//nest g res название(user,post,product...) --no-spec - создание сразу папки с модулем контролером и сервисом,
//удобно сразу обновляются все импорты во всем приложени и рутовом модуле
