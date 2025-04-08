// import { INestApplication } from '@nestjs/common';
// import { Test, TestingModule } from '@nestjs/testing';
// import { response } from 'express';
// import { AppModule } from '../src/app.module';
// import * as request from 'supertest';

// //Создаю полноценное моковое приложение для тестирования e2e
// //Разворачиваю бекенд и на выходе закрываю его
// describe('UserController (e2e)', () => {
//   let app: INestApplication;

//   //перед запуском тестов запускаю функцию
//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//   });

//   it('/users (GET)', () => {
//     return request(app.getHttpServer())
//       .get('/users')
//       .expect(200)
//       .expect([
//         {
//           id: '1',
//           email: 'test1@test.com',
//           fullName: 'Олег',
//           role: 'client',
//           createdAt: '2024-07-18T02:51:18.218Z',
//           updatedAt: '2024-07-18702:51:18.218Z',
//         },
//         {
//           id: '2',
//           email: 'test2@test.com',
//           fullName: 'Анатолий',
//           role: 'client',
//           createdAt: '2024-07-18T02:51:27.780Z',
//           updatedAt: '2024-07-18T02:51:27.780Z',
//         },
//       ]);
//   });

//   //Произойдет запись в БД нового user
//   it('/users/registration (POST)', () => {
//     return (
//       request(app.getHttpServer())
//         .post('/users/registration')
//         .send({
//           fullName: 'Вова',
//           email: 'test3@test.com',
//           password: '123',
//           role: 'client',
//         })
//         .expect(201)
//         // .expect((response) => {
//         //   console.log(response.body);
//         //   return response.body.fullName === 'Вова';
//         // });
//         .expect({
//           id: '3',
//           email: 'test3@test.com',
//           fullName: 'Вова',
//           role: 'client',
//           createdAt: '2024-07-18T02:51:27.780Z',
//           updatedAt: '2024-07-18T02:51:27.780Z',
//         })
//     );
//   });

//   afterAll(async () => {
//     await app.close();
//     //здесь можно почистить БД от того что записал в нее при тестировании
//   });
// });
