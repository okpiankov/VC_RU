import { useState } from "react";
import { Auth } from "./Auth";
import { Registration } from "./Registration";

type TypeProps = {
  setPopUpLogin: (popUpLogin: boolean) => void;
};

export const LoginForm = ({ setPopUpLogin }: TypeProps) => {
  const [auth, setAuth] = useState(true);

  return (
    <>
      {auth ? (
        <Auth setPopUpLogin={setPopUpLogin} setAuth={setAuth} />
      ) : (
        <Registration setPopUpLogin={setPopUpLogin} />
      )}
    </>
  );
};
