import { NavLink } from "react-router-dom";
import "./PostTitle.scss";
import { MessageCircle, Glasses } from "lucide-react";

export const PostTitle = ({
  id,
  author,
  theme,
  title,
  content,
  images,
}) => {
  return (
    <NavLink className="post_title" to={`/post/${id}`}>
      <div className="author">
        <b className="name">{author}</b>
        <div className="theme">
          <img className="icon" src={theme.icon} />
          {theme.name}
        </div>
      </div>

      <div className="title">{title}</div>
      <img className="img" src={images} />
      <div className="content">{content}</div>

      <div className="icon_panel">
        <div>
          <MessageCircle /> 100
        </div>
        <div>
          <Glasses /> 777
        </div>
      </div>
    </NavLink>
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
