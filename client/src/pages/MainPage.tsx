import { useState } from "react";
import { Header } from "../components/Header/Header";
import { LeftMenu } from "../components/LeftMenu/LeftMenu";
import { Chat } from "../components/Сhat/Chat";
import "./MainPage.scss";
import { Outlet } from "react-router-dom";
import { LoginForm } from "../components/Auth/LoginForm";
import { CreatePost } from "../components/CreatePost/CreatePost";

export const MainPage = () => {

  //Для открытия формы авторизации
  const [popUpLogin, setPopUpLogin] = useState(false);
  //Для открытия формы создания поста
  const [popUpCreatePost, setPopUpCreatePost] = useState(false);
  //Для открытия чата
  const [drawerChat, setDrawerChat] = useState(false); 

  return (
    <div className="container_main">
      {popUpLogin && <LoginForm setPopUpLogin={setPopUpLogin} />}
      {popUpCreatePost && <CreatePost setPopUpCreatePost={setPopUpCreatePost} />}
      {drawerChat && <Chat setDrawerChat={setDrawerChat} />}
      <Header setDrawerChat={setDrawerChat} setPopUpLogin={setPopUpLogin} setPopUpCreatePost={setPopUpCreatePost}/>
      <div className="container_inner">
        <LeftMenu />
        <section>
          <Outlet />
        </section>
      </div>

    </div>
  );
};
