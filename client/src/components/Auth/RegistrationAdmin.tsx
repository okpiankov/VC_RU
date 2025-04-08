import { useState } from "react";
import "./Registration.scss";

import axios from "axios";
import { useMutation } from "@tanstack/react-query";

type TypeUserCreate = {
  fullName: string;
  email: string;
  password: string;
  role: string;
};
type TypeUserGet = {
  id: string | null;
  fullName: string | null;
  email: string | null;
  role: string | null;
};
type TypeError = {
  response: { data: { message: string } };
};

export const RegistrationAdmin = () => {
  const [user, setUser] = useState<TypeUserGet>({
    id: "",
    fullName: "",
    email: "",
    role: "",
  });

  const formData: TypeUserCreate = {
    fullName: "Admin",
    email: "admin@test.com",
    password: "123",
    role: "admin",
  };

  const registration = async () => {
    const result = await axios.post<TypeUserGet>(
      `${import.meta.env.VITE_BASE_URL}/users/registration`,
      formData
      // {
      //   withCredentials: true,
      // }
    );
    console.log("user", result.data);

    setUser(result.data);
  };

  const mutation = useMutation({
    mutationKey: ["registration"],
    mutationFn: () => registration(),
  });
  console.log("mutation.error", mutation.error);

  //Чтобы протипизировать response в mutation.error
  const err = mutation.error as unknown as TypeError;
  return (
    <>
      {mutation.isError && (
        <div className="reg2">{err.response.data.message}</div>
      )}
      {user.email && <div className="reg2">Админ успешно зарегистрирован!</div>}

      <div className="add_admin" onClick={() => mutation.mutate()}>
        Зарегистрировать админа
      </div>
    </>
  );
};
