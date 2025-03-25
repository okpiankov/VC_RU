// import { useEffect, useState } from "react";
import { PostTitle } from "../../components/PostTitle/PostTitle";
import "./PostsList.scss";
import axios from "axios";
import { Skeleton1 } from "../../components/Skeleton/Skeleton";
import { useQuery } from "@tanstack/react-query";

type TypePostsList = {
  id: string;
  author: {
    fullName: string;
  };
  authorId: string;
  content: string;
  theme: string;
  comments: string[];
};

export const PostsList = () => {
  
  //Получение всех постов
  const getPosts = async () => {
    const result = await axios.get<TypePostsList[]>(
      `${import.meta.env.VITE_BASE_URL}/posts`
    );
    return result.data;
  };
  
  //useQuery() для получения данных, useMutation() для обновленния данных
  //данные из useQuery получаются только через "data" или обращение пременная.data
  //Запрос прописывается в queryFn через async, типы передаются так axios.get<TypePostsList[]>()
  const { data, error, isLoading, isSuccess } = useQuery({
    //по этому ключу будут храниться в кэше данные
    queryKey: ["posts"],
    queryFn: getPosts,

    //можно как-то преобразовывать данные
    //select: (data) => data.map...
    //Запрос зависит от условия можно сделать если только isAuth true
    //enabled: isAuth,
    //Запрос будет повторяться каждые 1000 мс
    //staleTime: 1000,
    //Начальное состояние
    initialData: [
      {
        id: "1",
        author: {
          fullName: "noName",
        },
        authorId: "2",
        content:
          "<h2>Привет от tanstack/react-query. Что-то пошло не так... </h2>",
        theme: "Без темы",
        comments: [],
      },
    ],
  });
  // console.log(
  //   "PostsList:",
  //   data,
  //   "error:",
  //   error,
  //   "isLoading:",
  //   isLoading,
  //   "isSuccess:",
  //   isSuccess
  // );
  return (
    <div className="posts_list">
      {isLoading ? <Skeleton1 /> : ""}
      {data?.map((item) => (
        <PostTitle
          key={item.id}
          id={item?.id}
          theme={item?.theme}
          author={item?.author?.fullName}
          content={item?.content}
          comments={item?.comments?.length}
          authorId={item?.authorId}
        />
      ))}
    </div>
  );
};

//Без tanstack/react-query
// const [isLoading, setIsLoading] = useState(false);
// const [posts, setPosts] = useState<TypePostsList[] | []>([]);
//
// const getPosts = async () => {
//   setIsLoading(true);
//   try {
//     // const result = await axios.get("http://localhost:7777/posts");
//     const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`);
//     console.log("PostsList", result.data);
//     setPosts(result.data);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setIsLoading(false);
//   }
// };
// useEffect(() => {
//   getPosts();
// }, []);

// return (
//   <div className="posts_list">
//     {isLoading ? <Skeleton1 /> : ""}
//     {posts.map((item) => (
//       <PostTitle
//         key={item.id}
//         id={item.id}
//         theme={item.theme}
//         author={item.author.fullName}
//         content={item.content}
//       />
//     ))}
//   </div>
// );
// };

// const posts = [
//   {
//     id: 1,
//     author: "Анатолий Вассерман",
//     theme: {
//       name: "Маркетинг",
//       // name: "Личный опыт",
//       icon: "/marketing.jpeg",
//       content:
//         "Рекламные кейсы из России и других стран, советы по продвижению, маркетинг и digital.",
//     },
//     title:
//       "Как ростовский бизнесмен набрал миллион подписчиков за месяц без вложений и продал рекламу Сберу",
//     content:
//       "Бизнесмен вел закрытый аккаунт на протяжении 10 лет, с такими же роликами как сейчас, но для друзей. Всё его окружение просили, чтобы он его открыл.<br></br>Он сделал аккаунт публичным только в сентябре 2023 года, его видео быстро стали вирусными. За месяц-полтора набрал больше миллиона подписчиков.<br></br>Человек-антидепрессант снимает рилсы, где призывает всех улыбаться, желает хорошего дня. У него красивый, уютный голос, богатый домашний интерьер и другие атрибуты роскоши, но выглядит это так, что он не кичится этим, а это его реальный образ жизни.",
//     images: ["/raf3.webp"],
//   },
// ];
