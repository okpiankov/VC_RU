import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./Comments.scss";
import axios from "axios";
import dayjs from "dayjs";
import { getUser } from "../../store/user/slice";
import { useSelector } from "react-redux";

type TypePostId = {
  postId: string;
};

export const Comments = ({ postId }: TypePostId) => {
  type TypeCommentSend = {
    text: string;
    // authorId: string;
    // postId: string;
  };
  type TypeCommentGet = {
    text: string;
    author: {
      fullName: string;
    };
    authorId: string;
    postId: string;
    createdAt: string;
    id: string;
  };

  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState<TypeCommentGet[] | []>([]);
  const user = useSelector(getUser);

  //Получение нового комментария сразу после создания:
  const [newComment, setNewComment] = useState<TypeCommentGet>({
    text: "",
    author: {
      fullName: "",
    },
    authorId: "",
    postId: "",
    createdAt: "",
    id: "",
  });

  //Получение всех комментариев
  const getPosts = async (postId: string) => {
    setIsLoading(true);
    try {
      // const result = await axios.get("http://localhost:7777/posts");
      const result = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/comments/${postId}`
      );
      console.log("comments", result.data);
      setComments(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPosts(postId);
  }, [newComment, postId]);

  //initialState для отправки формы комментария
  const initialState = {
    text: "",
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

  //Создание комментария
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const createComment = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/comments`,
          { ...formData, authorId: user.id, postId: postId }
        );
        console.log(response.data);
        setNewComment(response.data);
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
        <div>Количество комментариев {comments?.length}</div>
        <form onSubmit={handleSubmit} noValidate>
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
                <div className="comment_author">{comment.author.fullName}</div>
                <div>
                  Комментарий:
                  {dayjs(comment.createdAt).format("H:m /DD MMMM YYYY")}
                </div>
              </div>
              {comment.text}
            </div>
          ))}
        {/* Получение нового комментария сразу после создания: */}
        {newComment.text !== "" ||
          newComment.createdAt !== "" ||
          (newComment.author.fullName !== "" && (
            <div className="comment">
              <div className="comment_title">
                <div className="comment_author">
                  {newComment.author.fullName}
                </div>
                <div>
                  Комментарий:
                  {dayjs(newComment.createdAt).format("H:m /DD MMMM YYYY")}
                </div>
              </div>
              {newComment.text}
            </div>
          ))}
      </div>
    </>
  );
};

// const arrayComments = [
//   {
//     id: "1",
//     $createdAt: "28-01-2025",
//     text: "Секрет, видимо, в уникальном подходе к подаче и правильной вовлечённости.",
//     author: "Опытный юзер",
//   },
//   {
//     id: "2",
//     $createdAt: "28-01-2025",
//     text: "И ещё попал в запрос нынешнего времени)",
//     author: "Анатолий Вассерман",
//   },
// ];
