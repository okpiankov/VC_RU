import { useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import { LeftMenu } from "../components/LeftMenu/LeftMenu";
import { Chat } from "../components/Сhat/Chat";
import "./MainPage.scss";
import { Outlet } from "react-router-dom";
import { LoginForm } from "../components/Auth/LoginForm";
import { CreatePost } from "../components/CreatePost/CreatePost";
import { useSelector } from "react-redux";
import { getIsPopUpLogin } from "../store/user/slice";
import { LeftMenuPhone } from "../components/LeftMenuPhone/LeftMenuPhone";

export const MainPage = () => {
  const IsPopUpLogin = useSelector(getIsPopUpLogin);

  //Для открытия формы авторизации
  const [popUpLogin, setPopUpLogin] = useState(IsPopUpLogin);

  useEffect(() => {
    setPopUpLogin(IsPopUpLogin);
  }, [IsPopUpLogin]);

  //Для открытия формы создания поста
  const [popUpCreatePost, setPopUpCreatePost] = useState(false);
  //Для открытия чата
  const [drawerChat, setDrawerChat] = useState(false);
  //Для открытия панели навигации для мобильных устройств
  const [menu, setMenu] = useState(false);

  return (
    <div className="container_main">
      {popUpLogin && <LoginForm setPopUpLogin={setPopUpLogin} />}
      {popUpCreatePost && (
        <CreatePost setPopUpCreatePost={setPopUpCreatePost} />
      )}
      {drawerChat && <Chat setDrawerChat={setDrawerChat} />}
      <Header
        setDrawerChat={setDrawerChat}
        setPopUpLogin={setPopUpLogin}
        setPopUpCreatePost={setPopUpCreatePost}
        menu={menu}
        setMenu={setMenu}
      />
      <div className="container_inner">
        <LeftMenu />
        {/* Панель навигации для мобильных устройств */}
        {menu && <LeftMenuPhone menu={menu} setMenu={setMenu} />}
        <section>
          <Outlet />
        </section>
      </div>
    </div>
  );
};
