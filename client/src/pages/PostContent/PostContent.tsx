import { useEffect, useState } from "react";
import { Comments } from "../../components/Comments/Comments";
import "./PostContent.scss";
import { MessageCircle, Glasses } from "lucide-react";
import axios from "axios";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
import { arrayTheme } from "../PostsListTheme/PostsListTheme";

export const PostContent = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState({});
  //Парсинг HTML с тегами в React html-react-parser и безопасность от атак (XSS) dompurify
  const dirtyHTML = post.content;
  const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
    USE_PROFILES: { html: true },
  });

  const getPost = async (id) => {
    setIsLoading(true);
    try {
      // const result = await axios.get("http://localhost:7777/posts");
      const result = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/posts/${id}`
      );
      console.log(result.data);
      setPost(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPost(id);
  }, [id]);

  const objectTheme = arrayTheme.find((item) => item.name === post?.theme);
  // console.log("objectTheme", objectTheme);

  return (
    <div className="post">
      <div className="post_content">
        {/* <div className="name">{post.author}</div> */}

        <div className="author">
          <b className="name">{post.author?.fullName}</b>
          <div className="theme">
            <img className="icon" src={objectTheme?.icon} />
            {post.theme}
          </div>
        </div>

        {/* <div className="title">{post.title}</div>
      <img className="img" src={post.images[0]} />
      <div className="content">{post.description}</div> */}
        <div className="content">{parse(cleanHTML)}</div>

        <div className="icon_panel">
          <div>
            <MessageCircle /> 100
          </div>
          <div>
            <Glasses /> 777
          </div>
        </div>
      </div>

      {/* <div className="comments">
    </div> */}
      <Comments />
    </div>
  );
};

// const post = {
//   author: "Анатолий Вассерман",
//   theme: { name: "Маркетинг", icon: "/marketing.jpeg" },
//   title:
//     "Как ростовский бизнесмен набрал миллион подписчиков за месяц без вложений и продал рекламу Сберу",
//   description:
//     "Миллионер, бывший владелец алкогольных брендов стал знаменит фактически за месяц, набрав 1 млн подписчиков без каких-либо вложений. Как это было — разберем сегодня.<br></br>В интерне его называют «лавандовый раф», «кот Леопольд», человек-антидепрессант». Если вы смотрели хоть 1 видео Николая — понимаете, о чем речь.<br></br>Бизнесмен вел закрытый аккаунт на протяжении 10 лет, с такими же роликами как сейчас, но для друзей. Всё его окружение просило, чтобы он его открыл.<br></br>Он сделал аккаунт публичным только в сентябре 2023 года, его видео быстро стали вирусными. За месяц-полтора набрал больше миллиона подписчиков.<br></br>Человек-антидепрессант снимает рилсы, где призывает всех улыбаться, желает хорошего дня. У него красивый, уютный голос, богатый домашний интерьер и другие атрибуты роскоши, но выглядит это так, что он не кичится этим, а это его реальный образ жизни.<br></br>В начале ноября к Николаю пришел Сбер с рекламным контрактом, я полагаю, с много нулями. Он выпустил рекламу, где оплачивает свои покупки улыбкой через сервис банка.<br></br>В нужное время в нужном месте<br></br>В данном случае залетело всё само собой. У людей был запрос на «человека-антидепрессанта», и наш герой попал в этот запрос. Все устали от плохих новостей, треша и негатива. Лет 5 назад Николай бы явно не зашел на широкую массу, а сейчас — полетели!",
//   images: ["/raf3.webp"],
// };
