import axios from "axios";
import "./EditPost.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Eye, Trash2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";

type TypePostsList = {
  id: string;
  author: {
    fullName: string;
    email: string;
  };
  authorId: string;
  content: string;
  theme: string;
  comments: string[];
  createdAt: string;
};

export const EditPost = () => {
  //Получение всех постов
  const getPosts = async () => {
    const result = await axios.get<TypePostsList[]>(
      `${import.meta.env.VITE_BASE_URL}/posts`
    );
    return result.data;
  };

  const query = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  const { data, error, isLoading } = query;

  //Запрос на удаление поста
  const deletePost = async (id: string) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/posts/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log("updateUser", result.data);
  };

  const mutationDeletePost = useMutation({
    mutationKey: ["deletePost"],
    // нужно добавить тип в mutationFn: (id: string)!!!
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      query.refetch(); 
    },
  });
  console.log("mutationDeletePost.error", mutationDeletePost.error);

  return (
    <div className="container_edit_post">
      <div className="title_admin">Посты</div>

      <div className="post_list">
        {isLoading && <div className="loading">Загрузка...</div>}

        <div className="header_edit_post">
          <div className="header_position">id поста</div>
          <div className="header_position">Email</div>
          <div className="header_position">Имя автора</div>
          <div className="header_position">Дата создания</div>
          <Eye className="icon_admin" />
          <Trash2 className="icon_admin" />
        </div>
        <ul>
          {data?.map((post) => (
            <li key={post.id}>
              <div className="position">{post.id}</div>
              <div className="position">{post.author.email}</div>
              <div className="position">{post.author.fullName}</div>
              <div className="position">
                {dayjs(post.createdAt).format("H:m /DD MMMM YYYY")}
              </div>

              <NavLink to={`/${post.id}`}>
                <Eye className="icon_admin" />
              </NavLink>
              <Trash2
                className="icon_admin"
                onClick={() => mutationDeletePost.mutate(post.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
