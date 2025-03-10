import { ChangeEvent, FormEvent, useState } from "react";
import "./Comments.scss";
import axios from "axios";
import dayjs from "dayjs";
import { getUser } from "../../store/user/slice";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";

type TypePostId = {
  postId: string | undefined;
};
// type TypeAuthorId = {
//   postId: string;
// };
type TypeCommentSend = {
  text: string;
  // authorId: string | null;
  postId: string | undefined;
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

export const Comments = ({ postId }: TypePostId) => {
  const user = useSelector(getUser);
  // const { id } = user;
  // const queryClient = UseQueryClient();

  //initialState для отправки формы комментария
  const initialState = {
    text: "",
    postId: postId,
  };
  const [formData, setFormData] = useState<TypeCommentSend>({...initialState});

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

  //Получение всех комментариев
  const getComments = async (postId: string | undefined) => {
    // const result = await axios.get<TypeCommentGet[]>("http://localhost:7777/posts");
    const result = await axios.get<TypeCommentGet[]>(
      `${import.meta.env.VITE_BASE_URL}/comments/${postId}`
    );
    return result.data;
  };

  const query = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });
  const { data, error, isLoading } = query;
  console.log("Comments_in_post:", data, "error:", error);

  //Создание комментария и refetch на получение всех коммитов вместе с новым коммитом
  const createComment = async () => {
    const response = await axios.post<TypeCommentSend>(
      `${import.meta.env.VITE_BASE_URL}/comments`,
      { ...formData, authorId: user.id }
    );
    return response.data;
  };
  const mutation = useMutation({
    mutationKey: ["add_comment"],
    mutationFn: () => createComment(),
    //Если успешно сохранен новый коммит тогда refetch на получение всех коммитов
    onSuccess: () => {
      query.refetch();
    },
    //В любом случае всегда в конце очищать форму:
    onSettled: () => {
      resetForm();
    },
  });

  if (data === undefined) return;
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Можно не передавать данные в мутацию
    mutation.mutate();
  };
  console.log("mutation.data", mutation.data);

  return (
    <>
      <div className="commentsBox">
        <div>Количество комментариев {data?.length}</div>
        <form onSubmit={handleSubmit} noValidate>
          <textarea
            onChange={handleChange}
            value={formData.text}
            name="text"
            placeholder="Оставить комментарий"
          ></textarea>
          <button
            type="submit"
            className="button"
            // onClick={() => {mutate({...formData}); resetForm()}}
          >
            {isLoading ? "Загрузка..." : "Добавить"}
          </button>
        </form>

        {/* Получение ВСЕХ комментариев: */}
        {data?.length > 0 &&
          data?.map((comment) => (
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
        {/* Получение нового комментария сразу после создания:
        {mutation?.data?.text !== "" ||
          mutation?.data?.createdAt !== "" ||
          (mutation?.data?.author.fullName !== "" && (
            <div className="comment">
              <div className="comment_title">
                <div className="comment_author">
                  {mutation?.data?.author.fullName}
                </div>
                <div>
                  Комментарий:
                  {dayjs(mutation?.data?.createdAt).format("H:m /DD MMMM YYYY")}
                </div>
              </div>
              {mutation?.data?.text}
            </div>
          ))} */}
      </div>
    </>
  );
};

//Без tanstack/react-query
// const [isLoading, setIsLoading] = useState(false);
// const [comments, setComments] = useState<TypeCommentGet[] | []>([]);
// const user = useSelector(getUser);

// //Получение нового комментария сразу после создания:
// const [newComment, setNewComment] = useState<TypeCommentGet>({
//   text: "",
//   author: {
//     fullName: "",
//   },
//   authorId: "",
//   postId: "",
//   createdAt: "",
//   id: "",
// });

// //Получение всех комментариев
// const getComments = async (postId: string | undefined) => {
//   setIsLoading(true);
//   try {
//     // const result = await axios.get("http://localhost:7777/posts");
//     const result = await axios.get(
//       `${import.meta.env.VITE_BASE_URL}/comments/${postId}`
//     );
//     console.log("comments", result.data);
//     setComments(result.data);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setIsLoading(false);
//   }
// };
// useEffect(() => {
//   getComments(postId);
// }, [newComment, postId]);

// //initialState для отправки формы комментария
// const initialState = {
//   text: "",
// };

// const [formData, setFormData] = useState<TypeCommentSend>({
//   ...initialState,
// });
// // console.log(formData);

// // Функция для очистки формы после отправки
// function resetForm() {
//   Object.assign(formData, initialState);
// }

// const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
//   const { name, value } = event.target;
//   setFormData((prevState) => ({
//     ...prevState,
//     [name]: value,
//   }));
// };

// //Создание комментария
// const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//   event.preventDefault();

//   const createComment = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/comments`,
//         { ...formData, authorId: user.id, postId: postId }
//       );
//       console.log(response.data);
//       setNewComment(response.data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setIsLoading(false);
//       resetForm();
//     }
//   };
//   createComment();
// };

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
