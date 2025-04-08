// import axios from "axios";
// import { getPosts } from "../pages/PostsList/PostsList";

// //jest, describe, test... импортировать не нужно
// type TypePostsList = {
//   id: string;
//   author: {
//     fullName: string;
//   };
//   authorId: string;
//   content: string;
//   theme: string;
//   comments: unknown[];
// };

// jest.mock("axios");
// // axios.get = jest.fn()
// jest.mock("axios", () => ({
//   create: jest.fn(),
// }));

// describe("getPosts", () => {
//   let response: { data: TypePostsList[] };
//   beforeEach(() => {
//     response = {
//       data: [
//         {
//           id: "cm7yrxrvb0002pppi80fie2sp",
//           author: {
//             fullName: "Олег",
//           },
//           authorId: "cm7yrmdwq0000pppik1c49vvw",
//           content:
//             '<h2>Как ростовский бизнесмен набрал миллион подписчиков за месяц без вложений и продал рекламу Сберу</h2><p><img src="http://localhost:7777/uploads/lavender_raf_1.webp"></p><p>Человек-антидепрессант снимает рилсы, где призывает всех улыбаться</p>',
//           theme: "Маркетинг",
//           comments: [
//             { id: "cm7ysqc190001ppiq0fju6bnh" },

//             { id: "cm7ysr7p70003ppiqrlsqkogt" },

//             { id: "cm7ystyfq0005ppiqfjm2z01t" },

//             { id: "cm7ysux500007ppiqc48y2h6f" },
//           ],
//         },
//       ],
//     };
//   });
//   test("Корректное значение", async () => {
//     // axios.get.mockReturnValue(response);// ошибка типов
//     (axios.create as jest.Mock).mockReturnValue(response);
//     const data = await getPosts();
//     // expect(axios.get).toBeCalledTimes(1);//устарел метод?
//     expect(axios.get).toHaveBeenCalledTimes(1);
//     expect(data).toEqual({
//       data: [
//         {
//           id: "cm7yrxrvb0002pppi80fie2sp",
//           author: {
//             fullName: "Олег",
//           },
//           authorId: "cm7yrmdwq0000pppik1c49vvw",
//           content:
//             '<h2>Как ростовский бизнесмен набрал миллион подписчиков за месяц без вложений и продал рекламу Сберу</h2><p><img src="http://localhost:7777/uploads/lavender_raf_1.webp"></p><p>Человек-антидепрессант снимает рилсы, где призывает всех улыбаться</p>',
//           theme: "Маркетинг",
//           comments: [
//             { id: "cm7ysqc190001ppiq0fju6bnh" },

//             { id: "cm7ysr7p70003ppiqrlsqkogt" },

//             { id: "cm7ystyfq0005ppiqfjm2z01t" },

//             { id: "cm7ysux500007ppiqc48y2h6f" },
//           ],
//         },
//       ],
//     });
//     // expect(data).toMatchSnapshot();
//   });
// });
