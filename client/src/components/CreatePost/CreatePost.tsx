// import { Plus, ChevronDown, X } from "lucide-react";
import { useState } from "react";
import "./CreatePost.scss";
import { X } from "lucide-react";
import axios from "axios";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
// import ImageUploader from "ImageUploader";
// import ImageUploader from "quill-image-uploader-ts";
// import ImageUploader from "../../../node_modules/quill-image-uploader-ts/src/ImageUploader";
// quill-image-uploader написан на js, а quill-image-uploader-ts больше не поддерживается
import ImageUploader from "quill-image-uploader";
import { useSelector } from "react-redux";
import { getUser } from "../../store/user/slice";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type TypeProps = {
  setPopUpCreatePost: (popUpCreatePost: boolean) => void;
};

Quill.register("modules/imageUploader", ImageUploader);
const Size = Quill.import("formats/size");
Size.whitelist = ["medium", "large"];
Quill.register(Size, true);

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "size",
  "color",
];
const modules = {
  toolbar: {
    container: [
      [{ size: ["medium", "large"] }],
      [{ header: [2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ font: [] }],
      [{ color: [] }],
      ["link", "image"],
      ["clean"],
    ],
  },
  imageUploader: {
    upload: (file: File) => {
      console.log("консоль file", file);
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("image", file);

        fetch(`${import.meta.env.VITE_BASE_URL}/posts/uploads`, {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => {
            console.log("photo", result);
            resolve(result.url);
          })
          .catch((error) => {
            reject("Upload failed");
            console.error("Error:", error);
          });
      });
    },
  },
};

export const CreatePost = ({ setPopUpCreatePost }: TypeProps) => {
  // const [addSelect, setAddSelect] = useState(false);
  const [addTheme, setAddTheme] = useState("Без темы");
  console.log(addTheme);
  const user = useSelector(getUser);
  const queryClient = useQueryClient();

  //Контент для отправки на сервер(данные+теги) хранится как единая длинная строка
  //Каждое добавление картинки на сервер - в ответ приходит ссылка и добавляется в контент:
  //в нужном месте вставляется тег img, таким образом все компануется перед итоговой публикацией поста
  const [content, setContent] = useState("");
  console.log("Контент уходит на сервер:", content);

  const createPost = async () => {
    const result = await axios.post<string>(
      `${import.meta.env.VITE_BASE_URL}/posts`,
      {
        authorId: user.id,
        theme: addTheme,
        content: content,
      },
      {
        withCredentials: true,
      }
    );
    console.log(result.data);
    setPopUpCreatePost(false);
  };

  const mutation = useMutation({
    mutationKey: ["create_post"],
    mutationFn: () => createPost(),
    //Если нужно обновить данные(например получить все посты после создания нового)
    //но вызов функции в другом модуле то использую invalidateQueries если в одном модуле то  query.refetch()
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
    },
  });
  console.log("mutation.error", mutation.error);

  return (
    <>
      <div
        onClick={() => setPopUpCreatePost(false)}
        className="overlay_create_post"
      ></div>
      <div className="container_create_post show2">
        <X className="close" onClick={() => setPopUpCreatePost(false)} />
        <div className="author">{user.fullName}</div>

        <select
          value={addTheme}
          onChange={(e) => setAddTheme(e.currentTarget.value)}
          className="select_theme"
        >
          <option value="Без темы">Без темы </option>
          <option value="Маркетинг">Маркетинг</option>
          <option value="Разработка">Разработка</option>
          <option value="AI">AI</option>
          <option value="Инвестиции">Инвестиции</option>
          <option value="Будущее">Будущее</option>
          <option value="Личный опыт">Личный опыт</option>
          <option value="Путешествия">Путешествия</option>
          <option value="Еда">Еда</option>
        </select>

        <div className="overflow_create_post">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="editor"
            placeholder="Введите текст поста..."
            modules={modules}
            formats={formats}
          />

          {/* dangerouslySetInnerHTML — это свойство, которое позволяет программно устанавливать содержимое HTML-элементов в приложении React */}
          {/* применяется — когда нужно заполнить элемент div данными, поступающими из редактора форматированного текста */}
          {/* по умолчанию контент будет с тегами: */}
          {/* <div>{content}</div> */}
          {/* <div dangerouslySetInnerHTML={{ __html: content }}></div> */}
        </div>
        <button
          onClick={() => {
            mutation.mutate();
            setPopUpCreatePost(false);
          }}
          className="button_create_post"
        >
          Опубликовать
        </button>
        {/* <button className="button_create_post">Опубликовать</button> */}
      </div>
    </>
  );
};

//// Без tanstack/react-query
// export const CreatePost = ({ setPopUpCreatePost }: TypeProps) => {

//   // const [addSelect, setAddSelect] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [addTheme, setAddTheme] = useState("Без темы");
//   console.log(addTheme);
//   const user = useSelector(getUser);
//   const navigate = useNavigate();

//   //Контент для отправки на сервер(данные+теги) хранится как единая длинная строка
//   //Каждое добавление картинки на сервер - в ответ приходит ссылка и добавляется в контент:
//   //в нужном месте вставляется тег img, таким образом все компануется перед итоговой публикацией поста
//   const [content, setContent] = useState("");
//   console.log("Контент уходит на сервер:", content);

//   const createPosts = async () => {
//     setIsLoading(true);
//     try {
//       // const result = await axios.get("http://localhost:7777/uploads");
//       const result = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/posts`,
//         {
//           authorId: user.id,
//           theme: addTheme,
//           content: content,
//         }
//       );
//       console.log(result.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//       navigate("/");
//     }
//   };

{
  /* <h2 className="title">Заголовок</h2>
<div className="icons">
{addSelect === false ? (
<Plus className="plus" onClick={() => setAddSelect(!addSelect)} />
) : (
<X onClick={() => setAddSelect(!addSelect)} className="plus" />
)}
</div>

{
  addSelect && (
    <div className="select show1">
      <div className="option">Текст</div>
      <div className="option">Подзаголовок Н3</div>
      <div className="option">Фото или видео</div>
      <div className="option">Ссылка</div>
    </div>
  );
} */
}

{
  /* <div className="theme" onClick={() => setAddTheme(!addTheme)}>
  Тема <ChevronDown />
</div>;
{
  addTheme && (
    <div className="select">
      <div className="option">Маркетинг</div>
      <div className="option">Разработка</div>
      <div className="option">AI</div>
      <div className="option">Инвестиции</div>
      <div className="option">Будущее</div>
      <div className="option">Личный опыт</div>
      <div className="option">Путешествия</div>
      <div className="option">Еда</div>
    </div>
  );
} */
}

{
  /* <Plus className="plus" onClick={() => setAddSelect(!addSelect)} />
    <select className="select">
      <option>Текст</option>
      <option>Подзаголовок Н3</option>
      <option>Фото или видео</option>
      <option>Ссылка</option>
    </select> */
}

// const handleImageUpload = () => {
//   const input = document.createElement('input');
//   input.setAttribute('type', 'file');
//   input.setAttribute('accept', 'image/*');

//   input.addEventListener('change', async () => {
//     const file = input.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append('image', file);

//       // Replace with your API endpoint
//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();
//       const imageUrl = data.url;

//       const quill = this.quill;
//       const range = quill.getSelection();
//       quill.insertEmbed(range.index, 'image', imageUrl);
//     }
//   });

//   input.click();
// };

// const post = {
//   authorId: "cm7evxe8w0000ppl30k750koj",
//   title:
//     "Как ростовский бизнесмен набрал миллион подписчиков за месяц без вложений и продал рекламу Сберу",
//   content:
//     "Бизнесмен вел закрытый аккаунт на протяжении 10 лет, с такими же роликами как сейчас, но для друзей. Всё его окружение просили, чтобы он его открыл.<br></br>Он сделал аккаунт публичным только в сентябре 2023 года, его видео быстро стали вирусными. За месяц-полтора набрал больше миллиона подписчиков.<br></br>Человек-антидепрессант снимает рилсы, где призывает всех улыбаться, желает хорошего дня. У него красивый, уютный голос, богатый домашний интерьер и другие атрибуты роскоши, но выглядит это так, что он не кичится этим, а это его реальный образ жизни.",
// };

//modules вынес вне компонента иначе будет ошибка- пропадает редактор при вводе символа
//структура д/б toolbar: { container: [ handlers: { imageUploader: { иначе будет ошибка
