import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
// import { PrismaService } from 'src/prisma.service';

//мокаю саму prisma
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        JwtService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              //меняю методы на prisma
              findMany: jest.fn().mockResolvedValue({
                fullName: 'Oleg',
                email: 'test@test.com',
                password: '123',
                role: 'client',
              }),
              create: jest.fn().mockResolvedValue([
                {
                  id: '1',
                  email: 'test@test.com',
                  fullName: 'Oleg',
                  role: 'client',
                },
              ]),
            },
          },
        },
        // {
        //   provide: ConfigService,
        //   useValue: {},
        // },
      ],
    }).compile();

    //сгенерированный фейковый контроллер
    service = module.get<UserService>(UserService);
  });

  //здесь указываю теже фейковые данные что в beforeEach
  it('should create a new user', async () => {
    expect(
      await service.registration({
        fullName: 'Oleg',
        email: 'test@test.com',
        password: '123',
        role: 'client',
      }),
    ).toEqual({
      id: '1',
      email: 'test@test.com',
      fullName: 'Oleg',
      role: 'client',
    });

    //здесь указываю теже фейковые данные что в beforeEach
    it('should return an array of users', async () => {
      expect(await service.getUsers()).toEqual([
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
