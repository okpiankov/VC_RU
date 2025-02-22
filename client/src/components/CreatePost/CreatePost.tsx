import { useEffect, useState } from "react";
import "./CreatePost.scss";
import { Plus, ChevronDown, X } from "lucide-react";
import axios from "axios";

type TypeProps = {
  setPopUpCreatePost: (popUpCreatePost: boolean) => void;
};
export const CreatePost = ({ setPopUpCreatePost }: TypeProps) => {
  const [addSelect, setAddSelect] = useState(false);
  // const [addTheme, setAddTheme] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const post = {
    authorId: "cm7evxe8w0000ppl30k750koj",
    title:
      "Как ростовский бизнесмен набрал миллион подписчиков за месяц без вложений и продал рекламу Сберу",
    content:
      "Бизнесмен вел закрытый аккаунт на протяжении 10 лет, с такими же роликами как сейчас, но для друзей. Всё его окружение просили, чтобы он его открыл.<br></br>Он сделал аккаунт публичным только в сентябре 2023 года, его видео быстро стали вирусными. За месяц-полтора набрал больше миллиона подписчиков.<br></br>Человек-антидепрессант снимает рилсы, где призывает всех улыбаться, желает хорошего дня. У него красивый, уютный голос, богатый домашний интерьер и другие атрибуты роскоши, но выглядит это так, что он не кичится этим, а это его реальный образ жизни.",
  };

  const getPosts = async () => {
    setIsLoading(true);
    try {
      // const result = await axios.get("http://localhost:7777/posts");
      const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, post);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  // useEffect(() => {
  //   getPosts();
  // }, []);

  return (
    <>
      <div
        onClick={() => setPopUpCreatePost(false)}
        className="overlay_create_post"
      ></div>
      <div className="container_create_post show2">
        <X className="close" onClick={() => setPopUpCreatePost(false)} />
        <div className="author">Анатолий Вассерман</div>
        {/* <div className="theme" onClick={() => setAddTheme(!addTheme)} >Тема <ChevronDown/></div> */}
        {/* {addTheme && <div className="select" >
        <div className="option" >Маркетинг</div>
        <div className="option">Разработка</div>
        <div className="option">AI</div>
        <div className="option" >Инвестиции</div>
        <div className="option" >Будущее</div>
        <div className="option" >Личный опыт</div>
        <div className="option" >Путешествия</div>
        <div className="option" >Еда</div>
      </div>} */}
        <select className="select_theme">
          <option>Без темы </option>
          <option>Маркетинг</option>
          <option>Разработка</option>
          <option>AI</option>
          <option>Инвестиции</option>
          <option>Будущее</option>
          <option>Личный опыт</option>
          <option>Путешествия</option>
          <option>Еда</option>
        </select>

        <div className="overflow_create_post">
          <h2 className="title">Заголовок</h2>
          <div className="icons">
            {addSelect === false ? (
              <Plus className="plus" onClick={() => setAddSelect(!addSelect)} />
            ) : (
              <X onClick={() => setAddSelect(!addSelect)} className="plus" />
            )}
          </div>
          {/* <Plus className="plus" onClick={() => setAddSelect(!addSelect)} /> */}
          {/* <select className="select">
        <option>Текст</option>
        <option>Подзаголовок Н3</option>
        <option>Фото или видео</option>
        <option>Ссылка</option>
      </select> */}
          {addSelect && (
            <div className="select show1">
              <div className="option">Текст</div>
              <div className="option">Подзаголовок Н3</div>
              <div className="option">Фото или видео</div>
              <div className="option">Ссылка</div>
            </div>
          )}
          <p>
            Миллионер, бывший владелец алкогольных брендов стал знаменит
            фактически за месяц, набрав 1 млн подписчиков без каких-либо
            вложений. Как это было — разберем сегодня.<br></br>В интерне его
            называют «лавандовый раф», «кот Леопольд», человек-антидепрессант».
            Если вы смотрели хоть 1 видео Николая — понимаете, о чем речь.
            <br></br>Бизнесмен вел закрытый аккаунт на протяжении 10 лет, с
            такими же роликами как сейчас, но для друзей. Всё его окружение
            просило, чтобы он его открыл.<br></br>Он сделал аккаунт публичным
            только в сентябре 2023 года, его видео быстро стали вирусными. За
            месяц-полтора набрал больше миллиона подписчиков.<br></br>
            Человек-антидепрессант снимает рилсы, где призывает всех улыбаться,
            желает хорошего дня. У него красивый, уютный голос, богатый домашний
            интерьер и другие атрибуты роскоши, но выглядит это так, что он не
            кичится этим, а это его реальный образ жизни.<br></br>В начале
            ноября к Николаю пришел Сбер с рекламным контрактом, я полагаю, с
            много нулями. Он выпустил рекламу, где оплачивает свои покупки
            улыбкой через сервис банка.<br></br>В нужное время в нужном месте
            <br></br>В данном случае залетело всё само собой. У людей был запрос
            на «человека-антидепрессанта», и наш герой попал в этот запрос. Все
            устали от плохих новостей, треша и негатива. Лет 5 назад Николай бы
            явно не зашел на широкую массу, а сейчас — полетели!
          </p>
        </div>
        <button onClick={() => getPosts()} className="button_create_post">
          Опубликовать
        </button>
      </div>
    </>
  );
};
