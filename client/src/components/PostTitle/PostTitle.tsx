import { NavLink } from "react-router-dom";
import "./PostTitle.scss";
import { MessageCircle, Glasses } from "lucide-react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { arrayTheme } from "../../pages/PostsListTheme/PostsListTheme";

type TypePostTitle = {
  id: string;
  author: string;
  theme: string;
  content: string;
  comments: number;
  authorId: string;
};

export const PostTitle = ({
  id,
  author,
  theme,
  content,
  comments,
  authorId,
}: TypePostTitle) => {
  //Парсинг HTML с тегами в React html-react-parser и безопасность от атак (XSS) dompurify
  const dirtyHTML = content;
  const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
    USE_PROFILES: { html: true },
  });

  const objectTheme = arrayTheme.find((item) => item.name === theme);
  // console.log("objectTheme", objectTheme);

  return (
    <div className="post_title">
      <div className="author_theme">
        <div className="box_name">
          <NavLink to={`/blog/${authorId}`} className="navLink_author">
            <b className="name">{author}</b> 
          </NavLink>
          <div></div>
        </div>
        <div className="theme">
          <img className="icon" src={objectTheme?.icon} />
          {theme}
        </div>
      </div>
      <NavLink to={`/${id}`} className="navlink_post">
        {/* опасный метод парсинга html с тегами
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div> */}

        <div className="content">
          {parse(cleanHTML.substring(0, 500) + "...")} 
        </div>

        <div className="icon_panel">
          <div>
            <MessageCircle /> {comments}
          </div>
          <div>
            <Glasses /> 777
          </div>
        </div>
      </NavLink>
    </div>
  );
};

//   return (
//     <div className="post">
//       <div className="name">Анатолий Вассерман</div>
//       <div className="title">Как ростовский бизнесмен набрал миллион подписчиков за месяц без вложений и продал рекламу Сберу</div>
//       <img src="./raf.jpeg" />
//       <div className="content">Бизнесмен вел закрытый аккаунт на протяжении 10 лет, с такими же роликами как сейчас, но для друзей. Всё его окружение просили, чтобы он его открыл.<br></br>
//       Он сделал аккаунт публичным только в сентябре 2023 года, его видео быстро стали вирусными. За месяц-полтора набрал больше миллиона подписчиков.<br></br>
//       Человек-антидепрессант снимает рилсы, где призывает всех улыбаться, желает хорошего дня. У него красивый, уютный голос, богатый домашний интерьер и другие атрибуты роскоши, но выглядит это так, что он не кичится этим, а это его реальный образ жизни.</div>
//       <div className="icon_panel">
//         <div>
//           <MessageCircle /> 100
//         </div>
//         <div>
//           <Glasses /> 777
//         </div>
//       </div>
//     </div>
//   );
// };
