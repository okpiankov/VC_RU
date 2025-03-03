import { IsString } from 'class-validator';

//Валидация DTO - Data Transfer Object - те проверка приходящего объекта
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
