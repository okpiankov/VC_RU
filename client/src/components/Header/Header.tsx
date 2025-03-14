// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Header.scss";
import { Pencil } from "lucide-react";
import { getUser, User, userActions } from "../../store/user/slice";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect } from "react";

type TypeProps = {
  setDrawerChat: (drawerChat: boolean) => void;
  setPopUpLogin: (popUpLogin: boolean) => void;
  setPopUpCreatePost: (popUpCreatePost: boolean) => void;
};
export const Header = ({
  setDrawerChat,
  setPopUpLogin,
  setPopUpCreatePost,
}: TypeProps) => {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Функция выхода из авторизации
  const handleLogout = () => {
    dispatch(userActions.clearUserStore());
    navigate("/");
  };

  const handleClick = useCallback(
    (user: User) => {
      setPopUpLogin(true);
      if (user.role === "client") {
        setPopUpCreatePost(true);
        setPopUpLogin(false);
      }
    },
    [setPopUpLogin, setPopUpCreatePost]
  );
  useEffect(() => {
    if (user.role === "") return;
    handleClick(user);
  }, [user, handleClick]);

  return (
    <div className="header">
      <div className="header_container">
        <div className="logo">
          VC<br></br>.RU
        </div>
        {/*Рендерится если пользователь  Авторизован: */}
        {user.role === "client" && (
          <div className="login" onClick={() => setPopUpCreatePost(true)}>
            <Pencil />
            Написать
          </div>
        )}
        {/*Рендерится если пользователь НЕ авторизован: */}
        {user.role === "" && (
          <div className="login" onClick={() => handleClick(user)}>
            <Pencil />
            Написать
          </div>
        )}
        {user.id === "" && (
          <div
            className="login"
            onClick={() => {
              setPopUpLogin(true);
              // setPopUpCreatePost(false);
            }}
          >
            Войти
          </div>
        )}
        {user.role === "client" && (
          <div
            className="logout"
            onClick={() => {
              handleLogout();
              setPopUpCreatePost(false);
            }}
          >
            Выйти
          </div>
        )}

        {user.role === "client" && (
          <div
            className="chat"
            onClick={() => {
              setDrawerChat(true);
            }}
          >
            Чат
          </div>
        )}
        {user.role === "client" && (
          <div className="user">
            <img src="/dog.png" className="img" />
            {/* П */}
          </div>
        )}
      </div>
    </div>
  );
};
