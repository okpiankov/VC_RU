import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  //Добавил для работы с токенами:
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secret123',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [UserService, JwtModule],
})
export class UserModule {}
