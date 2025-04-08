// import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Header.scss";
import {
  Pencil,
  Search,
  Redo2,
  UserRound, 
  Menu,
  LogOut,
  Send,
  X,
} from "lucide-react";
import { getUser, User, userActions } from "../../store/user/slice";
import { NavLink, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { SearchQuery } from "../../pages/Search/SearchQuery";

type TypeProps = {
  setDrawerChat: (drawerChat: boolean) => void;
  setPopUpLogin: (popUpLogin: boolean) => void;
  setPopUpCreatePost: (popUpCreatePost: boolean) => void;
  menu: boolean;
  setMenu: (menu: boolean) => void;
};
export const Header = ({
  setDrawerChat,
  setPopUpLogin,
  setPopUpCreatePost,
  menu,
  setMenu,
}: TypeProps) => {
  console.log("menu", menu);

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
        // setPopUpCreatePost(true);
        setPopUpLogin(false);
      }
    },
    [setPopUpLogin]
  );

  useEffect(() => {
    if (user.role === "") return;
    handleClick(user);
  }, [user, handleClick]);

  const [search, setSearch] = useState(false);
  return (
    <>
      {/* Хедер для всех кроме мобильных устройств */}
      <div className="header">
        <div className="header_container">
          <div className="logo">
            VC<br></br>.RU
          </div>
          {search && <SearchQuery />  ? (
            <SearchQuery />
          ) : (
            <Search
              className="icon_search"
              onClick={() => setSearch(!search)}
            />
          )}
          {search && (
            <Redo2 className="icon_search" onClick={() => setSearch(!search)} />
          )}

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
            <div className="user" onClick={() => navigate("/cabinet")}>
              <img src="/dog.png" className="img" />
              {/* П */}
            </div>
          )}
        </div>
      </div>

      {/* Хедер для мобильных устройств */}
      <div className="header_phone">
        
        <NavLink className="vcru" to="/">
          VC<br></br>.RU
        </NavLink>

        <Menu onClick={() => setMenu(!menu)} />
        {search && <X onClick={() => setSearch(!search)} /> ? (
          <SearchQuery />
        ) : (
          <Search onClick={() => setSearch(!search)} />
        )}
        {search && <X onClick={() => setSearch(!search)} />}
        {user.id === "" && (
          <UserRound
            onClick={() => {
              setPopUpLogin(true);
            }}
          />
        )}
        {user.role === "client" && (
          <Send
            onClick={() => {
              setDrawerChat(true);
            }}
          />
        )}
        {user.role === "client" && (
          <LogOut
            onClick={() => {
              handleLogout();
              setPopUpCreatePost(false);
            }}
          />
        )}
        {user.role === "client" && (
          <div className="user" onClick={() => navigate("/cabinet")}>
            <img src="/dog.png" className="img" />
            {/* П */}
          </div>
        )}
        {/*Рендерится если пользователь  Авторизован: */}
        {user.role === "client" && (
          <div className="pencil" onClick={() => setPopUpCreatePost(true)}>
            <Pencil />
          </div>
        )}
      </div>
    </>
  );
};
