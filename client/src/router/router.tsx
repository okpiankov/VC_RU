import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "../pages/MainPage";
import { PostsList } from "../pages/PostsList/PostsList";
import { PostContent } from "../pages/PostContent/PostContent";
import { Marketing } from "../pages/Marketing/Marketing";
import { Invest } from "../pages/Invest/Invest";
import { Development } from "../pages/Development/Development";
import { AI } from "../pages/AI/AI";
import { Future } from "../pages/Future/Future";
import { Life } from "../pages/Life/Life";
import { Travel } from "../pages/Travel/Travel";
import { Food } from "../pages/Food/Food";



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
        path: "/marketing",
        element: <Marketing />,
      },
      {
        path: "/development",
        element: <Development />,
      },
      {
        path: "/ai",
        element: <AI />,
      },
      {
        path: "/invest",
        element: <Invest />,
      },
      {
        path: "/future",
        element: <Future />,
      },
      {
        path: "/life",
        element: <Life />,
      },
      {
        path: "/travel",
        element: <Travel />,
      },
      {
        path: "/food",
        element: <Food />,
      },
      {
        path: "/post/:id",
        element: <PostContent />,
      },
    
    ],
  },
]);

