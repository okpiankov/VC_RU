import { NavLink } from "react-router-dom";
import "./LeftMenu.scss";
import { Crown, Clock4, TvMinimalPlay } from "lucide-react";

export const LeftMenu = () => {

  return (
    <nav>
      <NavLink className="navLink" to="/">
        <Crown />
        Популярное
      </NavLink>
      <NavLink className="navLink" to="/">
        <Clock4 />
        Свежее
      </NavLink>
      <NavLink className="navLink" to="/">
        <TvMinimalPlay />
        Курсы
      </NavLink>
      <div className="themes">Темы</div>
      <NavLink className="navLink" to="/theme?theme=Маркетинг">
        <img src="/marketing.jpeg" />
        Маркетинг
      </NavLink>
      <NavLink className="navLink" to="/theme?theme=Разработка">
        <img src="/develop.png" />
        Разработка
      </NavLink>
      <NavLink className="navLink" to="/theme?theme=AI">
        <img src="/AI.png" />
        AI
      </NavLink>
      <NavLink className="navLink" to="/theme?theme=Инвестиции">
        <img src="/investment.jpeg" />
        Инвестиции
      </NavLink>
      <NavLink className="navLink" to="/theme?theme=Будущее">
        <img src="/future.jpeg" />
        Будущее
      </NavLink>
      <NavLink className="navLink" to="/theme?theme=Личный опыт">
        <img src="/experience.jpeg" />
        Личный опыт
      </NavLink>
      <NavLink className="navLink" to="/theme?theme=Путешествия">
        <img src="/travelling.png" />
        Путешествия
      </NavLink>
      <NavLink className="navLink" to="/theme?theme=Еда">
        <img src="/food.png" />
        Еда
      </NavLink>
    </nav>
  );
};
