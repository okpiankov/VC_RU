import { useEffect, useState } from "react";
import { PostTitle } from "../../components/PostTitle/PostTitle";
import "./PostsListTheme.scss";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

 export const arrayTheme = [
  {
    id: 1,
    name: "Маркетинг",
    type: "marketing",
    icon: "/marketing.jpeg",
    background: "color1",
    description:
      "Рекламные кейсы из России и других стран, советы по продвижению, маркетинг и digital.",
  },
  {
    id: 2,
    name: "Разработка",
    type: "develop",
    icon: "/develop.png",
    background: "color2",
    description:
      "Сообщество разработчиков: публикации о личном опыте, выдающиеся приёмы при решении рутинных задач, полезные материалы для профессионального роста.",
  },
  {
    id: 3,
    name: "AI",
    type: "AI",
    icon: "/AI.png",
    background: "color3",
    description: "Нейросети, искуственный интеллект, машинное обучение",
  },
  {
    id: 4,
    name: "Инвестиции",
    type: "investment",
    icon: "/investment.jpeg",
    background: "color4",
    description:
      "Вложения, фондовый рынок, криптовалюта, депозиты, движение FIRE. Новости и аналитика.",
  },
  {
    id: 5,
    name: "Будущее",
    type: "future",
    icon: "/future.jpeg",
    background: "color5",
    description:
      "Обсуждаем развитие науки и техники, которое повлияет на жизнь в ближайшие годы.",
  },
  {
    id: 6,
    name: "Личный опыт",
    type: "experience",
    icon: "/experience.jpeg",
    background: "color6",
    description:
      "Расскажите о том, через что вы прошли самостоятельно: кейс в работе, продуктивность, личные финансы.",
  },
  {
    id: 7,
    name: "Путешествия",
    type: "travel",
    icon: "/travelling.png",
    background: "color7",
    description: "Новости, репортажи, визы, лайфхаки, фото",
  },
  {
    id: 8,
    name: "Еда",
    type: "food",
    icon: "/food.png",
    background: "color8",
    description:
      "Рестораны и кафе, доставка еды, пища будущего и инновации в питании.",
  },
];

export const PostsListTheme = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const [search] = useSearchParams();

  useEffect(() => {
    const theme = search.get("theme");
    console.log("theme", theme);
    const getPostsTheme = async () => {
      setIsLoading(true);
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/posts?theme=${theme}`
        );
        console.log(result.data);
        setPosts(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getPostsTheme();
  }, [search]);

  const objectTheme = arrayTheme.find(
    (item) => item.name === search.get("theme")
  );
  // console.log("objectTheme", objectTheme);

  return (
    <div className="posts_list">
      <div className="post_theme">
        <div className={`${objectTheme?.background}`}></div>

        <div className="theme">
          <img className="icon" src={objectTheme?.icon} />
          <div className="name">{objectTheme?.name}</div>
          <div className="title">{objectTheme?.description}</div>
        </div>
      </div>

      {posts && posts.length > 0 ? (
        posts.map((item) => (
          <PostTitle
            key={item.id}
            id={item.id}
            theme={item.theme}
            author={item.author.fullName}
            content={item.content}
          />
        ))
      ) : (
        <div className="no_post">Нет постов по выбранной тематике</div>
      )}
    </div>
  );
};


  // return (
  //   <div className="posts_list">
  //     {/* <div className="post_theme">
  //       <div  className={` ${posts[0].theme.name === "Маркетинг" ? 'color1' : posts[0].theme.name === "Личный опыт" ? 'color2': ''}`}></div>

  //       <div className="theme">
  //         <img className="icon" src={posts[0].theme.icon} />
  //         <div className="name">{posts[0].theme.name}</div>
  //         <div className="title">{posts[0].theme.content}</div>
  //       </div>
  //     </div> */}

  //     {/* {posts.map((item) => (
  //       <PostTitle
  //         key={item.id}
  //         id={item.id}
  //         author={item.author}
  //         title={item.title}
  //         content={item.content}
  //         images={item.images}
  //         theme={item.theme}
  //       />
  //     ))} */}
  //     {/* {posts.map((item) => (
  //       <PostTitle
  //         key={item.id}
  //         id={item.id}
  //         theme={item.theme}
  //         author={item.author.fullName}
  //         content={item.content}
  //       />
  //     ))} */}
  //   </div>
  // );