import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { PostsList } from "../pages/PostsList/PostsList";
import { PostContent } from "../pages/PostContent/PostContent";
import { PostsListTheme } from "../pages/PostsListTheme/PostsListTheme";
import { SearchPage } from "../pages/Search/SearchPage";
import { Cabinet } from "../pages/Cabinet/Cabinet";
import { ProtectedRoute } from "./ProtectedRoute";
import { Blog } from "../pages/Blog/Blog";
import { Admin } from "../pages/Admin/Admin";
import { EditUser } from "../pages/Admin/EditUser/EditUser";
import { User } from "../pages/Admin/EditUser/User";
import { EditPost } from "../pages/Admin/EditPost/EditPost";
import { Home } from "../pages/Admin/Home/Home";
import { EditComment } from "../pages/Admin/EditComment/EditComment";
import { EditChat } from "../pages/Admin/EditChat/EditChat";
// import { Cabinet } from "../pages/Cabinet/Cabinet";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    children: [
      //Все роуты приходящие в  <Outlet /> в <MainPage />:
      {
        path: "/",
        element: <PostsList />,
      },
      {
        path: "/:id",
        element: <PostContent />,
      },
      {
        path: "/theme",
        element: <PostsListTheme />,
      },
      // линковать страницу поиска не нужно
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/blog/:id",
        element: <Blog />,
      },
      //личный кабинет
      {
        path: "/cabinet",
        element: (
          //защищенный роут
          <ProtectedRoute requiredRole="client">
            <Cabinet />
          </ProtectedRoute>
          // <Cabinet />
        ),
      },
    ],
  },
   // отдельный layout для админки
  {
    path: "/admin",
    element: (
      //защищенный роут
      <ProtectedRoute requiredRole="admin">
        <Admin />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/admin/editUser",
        element: <EditUser />,
      },
      {
        path: "/admin/editUser/:id",
        element: <User/>,
      },
      {
        path: "/admin/editPost",
        element: <EditPost/>,
      },
      {
        path: "/admin/editComment",
        element: <EditComment/>,
      },
      {
        path: "/admin/editChat",
        element: <EditChat/>,
      },
    ],
  },
]);
