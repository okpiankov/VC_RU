import { Test } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { response } from 'express';
import { JwtService } from '@nestjs/jwt';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        JwtService,
        {
          provide: UserService,
          useValue: {
            registration: jest.fn().mockResolvedValue({
              fullName: 'Oleg',
              email: 'test@test.com',
              password: '123',
              role: 'client',
            }),
            getUsers: jest.fn().mockResolvedValue([
              {
                id: '1',
                email: 'test@test.com',
                fullName: 'Oleg',
                role: 'client',
              },
            ]),
          },
        },
      ],
    }).compile();

    //сгенерированный фейковый контроллер
    controller = module.get<UserController>(UserController);
  });

  //здесь указываю теже фейковые данные что в beforeEach
  it('should create a new user', async () => {
    expect(
      await controller.registration(
        {
          fullName: 'Oleg',
          email: 'test@test.com',
          password: '123',
          role: 'client',
        },
        response,
      ),
    ).toEqual({
      id: '1',
      email: 'test@test.com',
      fullName: 'Oleg',
      role: 'client',
    });

    //здесь указываю теже фейковые данные что в beforeEach
    it('should return an array of users', async () => {
      expect(await controller.getUsers()).toEqual([
        {
          id: '1',
          email: 'test@test.com',
          fullName: 'Oleg',
          role: 'client',
        },
      ]);
    });
  });
});
