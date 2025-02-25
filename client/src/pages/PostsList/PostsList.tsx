import { useEffect, useState } from "react";
import { PostTitle } from "../../components/PostTitle/PostTitle";
import "./PostsList.scss";
import axios from "axios";

export const PostsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const posts = [
    {
      id: 1,
      author: "Анатолий Вассерман",
      theme: {
        name: "Маркетинг",
        // name: "Личный опыт",
        icon: "/marketing.jpeg",
        content:
          "Рекламные кейсы из России и других стран, советы по продвижению, маркетинг и digital.",
      },
      title:
        "Как ростовский бизнесмен набрал миллион подписчиков за месяц без вложений и продал рекламу Сберу",
      content:
        "Бизнесмен вел закрытый аккаунт на протяжении 10 лет, с такими же роликами как сейчас, но для друзей. Всё его окружение просили, чтобы он его открыл.<br></br>Он сделал аккаунт публичным только в сентябре 2023 года, его видео быстро стали вирусными. За месяц-полтора набрал больше миллиона подписчиков.<br></br>Человек-антидепрессант снимает рилсы, где призывает всех улыбаться, желает хорошего дня. У него красивый, уютный голос, богатый домашний интерьер и другие атрибуты роскоши, но выглядит это так, что он не кичится этим, а это его реальный образ жизни.",
      images: ["/raf3.webp"],
    },
  ];

  const getPosts = async () => {
    setIsLoading(true);
    try {
      // const result = await axios.get("http://localhost:7777/posts");
      const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`)
      console.log(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="posts_list">
      {/* <div className="post_theme">
        <div  className={` ${posts[0].theme.name === "Маркетинг" ? 'color1' : posts[0].theme.name === "Личный опыт" ? 'color2': ''}`}></div>

        <div className="theme">
          <img className="icon" src={posts[0].theme.icon} />
          <div className="name">{posts[0].theme.name}</div>
          <div className="title">{posts[0].theme.content}</div>
        </div>
      </div> */}

      {posts.map((item) => (
        <PostTitle
          key={item.id}
          id={item.id}
          author={item.author}
          title={item.title}
          content={item.content}
          images={item.images}
          theme={item.theme}
        />
      ))}
      {posts.map((item) => (
        <PostTitle
          key={item.id}
          id={item.id}
          author={item.author}
          title={item.title}
          content={item.content}
          images={item.images}
          theme={item.theme}
        />
      ))}
    </div>
  );
};
