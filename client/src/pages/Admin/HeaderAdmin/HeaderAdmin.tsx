import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  userActions } from "../../../store/user/slice";
import "./HeaderAdmin.scss";
import { LogOut } from "lucide-react";


export const HeaderAdmin = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Функция выхода из авторизации
  const handleLogout = () => {
    dispatch(userActions.clearUserStore());
    navigate("/");
  };

  return (
    <>
      <div className="header_admin">
        <div className="logo">
          VC<br></br>.RU
        </div>

        <LogOut
          className="logout_admin"
          onClick={() => {
            handleLogout();
          }}
        />
      </div>
    </>
  );
};
