import { NavLink } from "react-router-dom";
import "./LeftMenuAdmin.scss";
import { Home, GanttChartSquare, UserRound, MessageSquare, MessagesSquare } from "lucide-react";

export const LeftMenuAdmin = () => {
  return (
    <nav className="nav_admin">
      <NavLink className="navLink_admin" to="/admin">
        <Home />
        Главная
      </NavLink>
      <NavLink className="navLink_admin" to="/admin/editPost">
        <GanttChartSquare />
        Посты
      </NavLink>
      <NavLink className="navLink_admin" to="/admin/editUser">
        <UserRound />
        Пользователи
      </NavLink>
      <NavLink className="navLink_admin" to="/admin/editComment">
        <MessageSquare />
        Комментарии
      </NavLink>
      <NavLink className="navLink_admin" to="/admin/editChat">
        <MessagesSquare />
        Чат
      </NavLink>
    </nav>
  );
};

