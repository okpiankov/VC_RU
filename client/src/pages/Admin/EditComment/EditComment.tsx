import axios from "axios";
import "./EditComment.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Eye, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";

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

export const EditComment = () => {

  //Получение всех комментариев
  const getComments = async () => {
    const result = await axios.get<TypeCommentGet[]>(
      `${import.meta.env.VITE_BASE_URL}/comments`,
      {
        withCredentials: true,
      }
    );
    return result.data;
  };

  const query = useQuery({
    queryKey: ["getComments"],
    queryFn: () => getComments(),
  });
  const { data, error, isLoading } = query;
  console.log("getComments:", data, "error:", error);

  //Запрос на удаление комментария
  const deleteComment = async (id: string) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/comments/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log("deleteComment", result.data);
  };

  const mutationDeleteComment = useMutation({
    mutationKey: ["deleteComment"],
    // нужно добавить тип в mutationFn: (id: string)!!!
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      query.refetch();
    },
  });
  console.log("mutationDeleteComment.error", mutationDeleteComment.error);

  return (
    <div className="container_edit_сomment">
      <div className="title_admin">Комментарии</div>

      <div className="сomment_list">
        {isLoading && <div className="loading">Загрузка...</div>}

        <div className="header_edit_сomment">
          <div className="header_position">id комментария</div>
          <div className="header_position">Имя автора</div>
          <div className="header_position">Текст</div>
          <div className="header_position">Дата создания</div>
          <Eye className="icon_admin" />
          <Trash2 className="icon_admin" />
        </div>
        <ul>
          {data?.map((comment) => (
            <li key={comment.id}>
              <div className="position">{comment.id}</div>
              <div className="position">{comment.author.fullName}</div>
              <div className="position">{comment.text}</div>
              <div className="position">
                {dayjs(comment.createdAt).format("H:m /DD MMMM YYYY")}
              </div>

              <NavLink to={`/${comment.postId}`}>
                <Eye className="icon_admin" />
              </NavLink>
              <Trash2
                className="icon_admin"
                onClick={() => mutationDeleteComment.mutate(comment.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
