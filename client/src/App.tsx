import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { Provider } from "react-redux";
import { rootStore } from "./store/store";
// import { createContext, useState } from "react";

function App() {
  return (
    <Provider store={rootStore}>
      <RouterProvider router={router} />;
    </Provider>
  );
}

export default App;
