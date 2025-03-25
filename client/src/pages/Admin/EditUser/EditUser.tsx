import axios from "axios";
import "./EditUser.scss";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";

type TypeUsersList = {
  email: string;
  fullName: string;
  id: string;
  role: string;
  createdAt: string;
};

export const EditUser = () => {
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
  const { data, error, isLoading } = useQuery({
    //по этому ключу будут храниться в кэше данные
    queryKey: ["getUsers"],
    queryFn: getUsers,
  });
  console.log("getUsers", data);

  return (
    <div className="container_edit_user">
      <div className="title_admin">Пользователи</div>

      <div className="users_list">
        {isLoading && <div className="loading">Загрузка...</div>}

        <div className="header_edit_user">
          <div className="header_position">Email</div>
          <div className="header_position">Полное имя</div>
          <div className="header_position">Дата регистрации</div>
          <Pencil className="icon_admin" />
        </div>
        <ul>
          {data?.map((user) => (
            <li key={user.id}>
              <div className="position">{user.email}</div>
              <div className="position">{user.fullName}</div>
              <div className="position">
                {dayjs(user.createdAt).format("H:m /DD MMMM YYYY")}
              </div>

              <NavLink to={`/admin/editUser/${user.id}`}>
                <Pencil className="icon_admin" />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
