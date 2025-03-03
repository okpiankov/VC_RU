import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { PostsList } from "../pages/PostsList/PostsList";
import { PostContent } from "../pages/PostContent/PostContent";
import { PostsListTheme } from "../pages/PostsListTheme/PostsListTheme";

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
    ],
  },
]);
