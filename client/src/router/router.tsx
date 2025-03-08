import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { PostsList } from "../pages/PostsList/PostsList";
import { PostContent } from "../pages/PostContent/PostContent";
import { PostsListTheme } from "../pages/PostsListTheme/PostsListTheme";
// import { ProtectedRoute } from "./ProtectedRoute";
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
      // {
      //   path: "/cabinet",
      //   element: (
      //     // <ProtectedRoute requiredRole="client">
      //     //   <Cabinet />
      //     // </ProtectedRoute>
      //     // <Cabinet />
      //   ),
      // },
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
