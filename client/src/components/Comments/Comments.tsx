import { ChangeEvent, FormEvent, useState } from "react";
import "./Comments.scss";
import axios from "axios";

export const Comments = () => {
  const comments = [
    {
      id: "1",
      $createdAt: "28-01-2025",
      text: "Секрет, видимо, в уникальном подходе к подаче и правильной вовлечённости.",
      author: "Опытный юзер",
    },
    {
      id: "2",
      $createdAt: "28-01-2025",
      text: "И ещё попал в запрос нынешнего времени)",
      author: "Анатолий Вассерман",
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  type TypeCommentSend = {
    text: string;
    author: string;
  };
  //initialState для отправки формы комментария
  const initialState = {
    text: "",
    author: "Анатолий Вассерман",
  };

  const [formData, setFormData] = useState<TypeCommentSend>({
    ...initialState,
  });
  // console.log(formData);

  // Функция для очистки формы после отправки
  function resetForm() {
    Object.assign(formData, initialState);
  }

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //Создание комментария
    const createComment = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/comment/create`,
          formData
        );
        // console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        resetForm();
      }
    };
    createComment();
  };

  return (
    <>
      <div className="commentsBox">
        <div>Количество комментариев 100</div>
        <form onSubmit={handleSubmit} noValidate > 
          <textarea
            onChange={handleChange}
            value={formData.text}
            name="text"
            placeholder="Оставить комментарий"
          ></textarea>
          <button type="submit" className="button">
            {isLoading ? "Загрузка..." : "Добавить"}
          </button>
        </form>

        {/* Получение ВСЕХ комментариев: */}
        {comments.length > 0 &&
          comments?.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment_title">
                <div className="comment_author">{comment.author}</div>
                <div>Комментарий: {comment.$createdAt}</div>
              </div>
              {comment.text}
            </div>
          ))}
        {/* Получение нового комментария сразу после создания: */}
        
      </div>
    </>
  );
};
