import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { PostsList } from "../pages/PostsList/PostsList";
import { PostContent } from "../pages/PostContent/PostContent";
import { PostsListTheme } from "../pages/PostsListTheme/PostsListTheme";
import { SearchPage } from "../pages/Search/SearchPage";
import { Cabinet } from "../pages/Cabinet/Cabinet";
import { ProtectedRoute } from "./ProtectedRoute";
import { Blog } from "../pages/Blog/Blog";
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
      {
        path: "/cabinet",
        element: (
          <ProtectedRoute requiredRole="client">
            <Cabinet />
          </ProtectedRoute>
          // <Cabinet />
        ),
      },
    ],
  },
  //// отдельный layout для личного кабинета
  // {
  //   path: "/cabinet",
  //   element: (
  //     <ProtectedRoute requiredRole="client">
  //       <Cabinet />
  //     </ProtectedRoute>
  //   ),
    // children: [
    //   {
    //     index: true,
    //     element: <СabinetPage />,
    //   },
    // ],
  // },
]);
