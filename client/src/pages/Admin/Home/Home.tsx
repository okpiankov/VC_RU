import axios from "axios";
import "./Home.scss";
import { useQuery } from "@tanstack/react-query";

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
type TypeUsersList = {
  email: string;
  fullName: string;
  id: string;
  role: string;
  createdAt: string;
};

export const Home = () => {
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

  const comments = data?.reduce((result, comment) => {
    return result + comment.comments.length;
  }, 0);

  const marketing = data?.reduce((result, post) => {
    if (post.theme === "Маркетинг") {
      result++;
    }
    return result;
  }, 0);

  const development = data?.reduce((result, post) => {
    if (post.theme === "Разработка") {
      result++;
    }
    return result;
  }, 0);

  const AI = data?.reduce((result, post) => {
    if (post.theme === "AI") {
      result++;
    }
    return result;
  }, 0);

  const investments = data?.reduce((result, post) => {
    if (post.theme === "Инвестиции") {
      result++;
    }
    return result;
  }, 0);

  const future = data?.reduce((result, post) => {
    if (post.theme === "Будущее") {
      result++;
    }
    return result;
  }, 0);

  const experience = data?.reduce((result, post) => {
    if (post.theme === "Личный опыт") {
      result++;
    }
    return result;
  }, 0);

  const travel = data?.reduce((result, post) => {
    if (post.theme === "Путешествия") {
      result++;
    }
    return result;
  }, 0);

  const food = data?.reduce((result, post) => {
    if (post.theme === "Еда") {
      result++;
    }
    return result;
  }, 0);

  //Получение всех пользователей
  const getUsers = async () => {
    const result = await axios.get<TypeUsersList[]>(
      `${import.meta.env.VITE_BASE_URL}/users`,
      {
        withCredentials: true,
      }
    );
    return result.data;
  };
  const users = useQuery({
    queryKey: ["getUsers"],
    queryFn: getUsers,
  });

  const theme = data?.find((item) => {
    if (item.comments.length > 0) {
      return item;
    }
  });
  // console.log("count", theme);

  return (
    <div className="container_home">
      <div className="title_home">Админ панель</div>

      {isLoading && <div className="loading">Загрузка...</div>}

      <div className="statistics">
      <div className="position_statistics">
          Статистические данные
        </div>
        <div className="position_statistics">
          Общее количество постов {data?.length}
        </div>
        <div className="position_statistics">
          Общее количество постов по теме "Маркетинг" {marketing}
        </div>
        <div className="position_statistics">
          Общее количество постов по теме "Разработка" {development}
        </div>
        <div className="position_statistics">
          Общее количество постов по теме "AI" {AI}
        </div>
        <div className="position_statistics">
          Общее количество постов по теме "Инвестиции" {investments}
        </div>
        <div className="position_statistics">
          Общее количество постов по теме "Будущее" {future}
        </div>
        <div className="position_statistics">
          Общее количество постов по теме "Личный опыт" {experience}
        </div>
        <div className="position_statistics">
          Общее количество постов по теме "Путешествия" {travel}
        </div>
        <div className="position_statistics">
          Общее количество постов по теме "Еда" {food}
        </div>
        <div className="position_statistics">
          Общее количество комментариев {comments}
        </div>
        <div className="position_statistics">
          Тема с самым большим количеством комментариев {theme?.theme}
        </div>
        <div className="position_statistics">
          Общее количество пользователей {users.data?.length}
        </div>
      </div>
    </div>
  );
};
