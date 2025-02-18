// import { NavLink } from "react-router-dom";
import "./Header.scss";
import { Pencil } from "lucide-react";

type TypeProps = {
  setDrawerChat: (drawerChat: boolean) => void;
  setPopUpLogin: (popUpLogin: boolean) => void;
  setPopUpCreatePost: (popUpCreatePost: boolean) => void;
};
export const Header = ({ setDrawerChat, setPopUpLogin, setPopUpCreatePost}: TypeProps) => {
  return (
    <div className="header">
      <div className="header_container">
        <div className="logo">
          VC<br></br>.RU
        </div>
        <div className="login" onClick={() => setPopUpCreatePost(true)}>
          <Pencil />
          Написать
        </div>
        <div className="login" onClick={() => setPopUpLogin(true)}>
          Войти
        </div>
        <div className="logout">Выйти</div>
        <div className="chat" onClick={() => setDrawerChat(true)}>
          Чат
        </div>
      </div>
    </div>
  );
};
