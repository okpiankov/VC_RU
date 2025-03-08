import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

//ОШИБКА для каждого запроса -свой класс DTO, для авторизации  CreateUserDto не пойдет!
//Валидация через класс DTO - Data Transfer Object - те проверка приходящего объекта
//Регистрация
export class CreateUserDto {
  @IsString({
    message: 'Имя не строка!',
  })
  fullName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: string;
}
//Авторизация
export class AuthUserDto {
  @IsString()
  email: string;

  // @IsString()
  // password: string;
  @Exclude()
  password: string;
}
