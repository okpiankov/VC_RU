import { Navigate } from "react-router-dom";
import { getUser } from "../store/user/slice";
import { useSelector } from "react-redux";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  requiredRole: string;
};
export const ProtectedRoute = ({ children, requiredRole }: Props) => {
  // Подписка на user из Redux
  const user = useSelector(getUser);
  // console.log(user);

  if (!user?.id && requiredRole !== user?.role) {
    return <Navigate to="/" replace />;
  }
  return children;

  // Можно так но при переходе по адресу не авторизованным пользователем будет пустая страница
  // if (user ||  requiredRole == user?.role) {
  //   return children;
  // }
  //или вообще так:
  // if (requiredRole == user?.data?.role) {
  //   return children;
  // }
};
