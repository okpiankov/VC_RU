import { PostTitle } from "../../components/PostTitle/PostTitle";
import "./Invest.scss";

export const Invest = () => {
  const posts = [
    {
      id: 4,
      author: "Анатолий Вассерман",
      theme: {
        name: "Инвестиции",
        icon: "/investment.jpeg",
        description:
          "Вложения, фондовый рынок, криптовалюта, депозиты, движение FIRE. Новости и аналитика.",
      },
      title:
        "Как ростовский бизнесмен набрал миллион подписчиков за месяц без вложений и продал рекламу Сберу",
        content:
        "Бизнесмен вел закрытый аккаунт на протяжении 10 лет, с такими же роликами как сейчас, но для друзей. Всё его окружение просили, чтобы он его открыл.<br></br>Он сделал аккаунт публичным только в сентябре 2023 года, его видео быстро стали вирусными. За месяц-полтора набрал больше миллиона подписчиков.<br></br>Человек-антидепрессант снимает рилсы, где призывает всех улыбаться, желает хорошего дня. У него красивый, уютный голос, богатый домашний интерьер и другие атрибуты роскоши, но выглядит это так, что он не кичится этим, а это его реальный образ жизни.",
      images: ["/raf3.webp"],
    },
  ];

  return (
    <div className="posts_list">
      <div className="post_theme">
        <div className="color4"></div>

        <div className="theme">
          <img className="icon" src={posts[0].theme.icon} />
          <div className="name">{posts[0].theme.name}</div>
          <div className="title">{posts[0].theme.description}</div>
        </div>
        
      </div>

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
