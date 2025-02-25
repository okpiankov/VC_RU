import { ChangeEvent, FormEvent, useState } from "react";
import "./Auth.scss";
import { validateEmail, validatePassword } from "./validate";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type TypeProps = {
  setPopUpLogin: (popUpLogin: boolean) => void;
  setAuth: (auth: boolean) => void;
};
// type User = {
//   data: {
//     fullName: string | null;
//     email: string | null;
//     id: number | null;
//     role: string | null;
//   };
// };

export const Auth = ({ setPopUpLogin, setAuth }: TypeProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "user@test.com",
    password: "123",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "email" && value !== " ") {
      validateEmail({ value: value, setEmailError: setEmailError });
    }
    if (name === "password" && value !== " ") {
      validatePassword({ value: value, setPasswordError: setPasswordError });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const login = async () => {
      setIsLoading(true);
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/login`,
          formData,
          // {
          //   withCredentials: true,
          // }
        );
        console.log(result.data);

        // if (result.data.role === "client") {
        //   navigate("/cabinet");
        // }
        // if (result.data.role === "admin") {
        //   navigate("/admin");
        // }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    login();
  };

  return (
    <>
      <div className="overlay_auth" onClick={() => setPopUpLogin(false)}></div>

      {isLoading === true && <div className="loading">Загрузка...</div>}

      <form onSubmit={handleSubmit} className="form showTop">
        <div className="nameError">{emailError}</div>
        <input
          type="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
          placeholder="Логин: user@test.com"
        />
        <div className="nameError">{passwordError}</div>
        <input
          type="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          placeholder="Пароль: 123"
        />

        <button type="submit" className="button" >Войти</button>
        <div onClick={()=> setAuth(false)}>Регистрация</div>
      </form>
    </>
  );
};
