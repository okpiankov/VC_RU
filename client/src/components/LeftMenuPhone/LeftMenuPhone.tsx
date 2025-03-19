import { NavLink } from "react-router-dom";
import "./LeftMenuPhone.scss";
import { Crown, Clock4, TvMinimalPlay } from "lucide-react";

type TypeProps = {
  menu: boolean;
  setMenu: (menu: boolean) => void;
};
export const LeftMenuPhone = ({ menu, setMenu }: TypeProps) => {
  return (
    <nav className="nav_phone showTop2">
      <NavLink className="navLink_phone" to="/" onClick={() => setMenu(!menu)}>
        <Crown />
        Популярное
      </NavLink>
      <NavLink className="navLink_phone" to="/" onClick={() => setMenu(!menu)}>
        <Clock4 />
        Свежее
      </NavLink>
      <NavLink className="navLink_phone" to="/" onClick={() => setMenu(!menu)}>
        <TvMinimalPlay />
        Курсы
      </NavLink>
      <div className="themes_phone">Темы</div>
      <NavLink
        className="navLink_phone"
        to="/theme?theme=Маркетинг"
        onClick={() => setMenu(!menu)}
      >
        <img className="img_phone" src="/marketing.jpeg" />
        Маркетинг
      </NavLink>
      <NavLink
        className="navLink_phone"
        to="/theme?theme=Разработка"
        onClick={() => setMenu(!menu)}
      >
        <img className="img_phone" src="/develop.png" />
        Разработка
      </NavLink>
      <NavLink
        className="navLink_phone"
        to="/theme?theme=AI"
        onClick={() => setMenu(!menu)}
      >
        <img className="img_phone" src="/AI.png" />
        AI
      </NavLink>
      <NavLink
        className="navLink_phone"
        to="/theme?theme=Инвестиции"
        onClick={() => setMenu(!menu)}
      >
        <img className="img_phone" src="/investment.jpeg" />
        Инвестиции
      </NavLink>
      <NavLink
        className="navLink_phone"
        to="/theme?theme=Будущее"
        onClick={() => setMenu(!menu)}
      >
        <img className="img_phone" src="/future.jpeg" />
        Будущее
      </NavLink>
      <NavLink
        className="navLink_phone"
        to="/theme?theme=Личный опыт"
        onClick={() => setMenu(!menu)}
      >
        <img className="img_phone" src="/experience.jpeg" />
        Личный опыт
      </NavLink>
      <NavLink
        className="navLink_phone"
        to="/theme?theme=Путешествия"
        onClick={() => setMenu(!menu)}
      >
        <img className="img_phone" src="/travelling.png" />
        Путешествия
      </NavLink>
      <NavLink
        className="navLink_phone"
        to="/theme?theme=Еда"
        onClick={() => setMenu(!menu)}
      >
        <img className="img_phone" src="/food.png" />
        Еда
      </NavLink>
    </nav>
  );
};
// className={({ isActive }) => (isActive ? "active2" : "navLink")}
