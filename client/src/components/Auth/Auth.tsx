import { ChangeEvent, FormEvent, useState } from "react";
import "./Auth.scss";
import { validateEmail, validatePassword } from "./validate";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user/slice";
import { useMutation } from "@tanstack/react-query";

type TypeProps = {
  setPopUpLogin: (popUpLogin: boolean) => void;
  setAuth: (auth: boolean) => void;
};
type TypeError = {
  response: { data: { message: string } };
};
type TypeAuth = {
  email: string;
  password: string;
  fullName: string;
  role: string;
  id: string;
};

export const Auth = ({ setPopUpLogin, setAuth }: TypeProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "user@test.com",
    password: "123",
  });
  //Стейты  для валидации:
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    //Валидация:
    if (name === "email" && value !== " ") {
      validateEmail({ value: value, setEmailError: setEmailError });
    }
    if (name === "password" && value !== " ") {
      validatePassword({ value: value, setPasswordError: setPasswordError });
    }
  };

  //Авторизация post запрос обрабатывается через useMutation
  const login = async () => {
    const result = await axios.post<TypeAuth>(
      `${import.meta.env.VITE_BASE_URL}/auth/login`,
      formData,
      {
        withCredentials: true,
      }
    );
    console.log("user", result.data);
    dispatch(userActions.setUser(result.data));

    // if (result.data.role === "client") {
    //   navigate("/cabinet");
    // }
    // if (result.data.role === "admin") {
    //   navigate("/admin");
    // }

    console.log("cookies", document.cookie);
    // !error && setPopUpLogin(false);
  };

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(),
  });
  const { isPending, isError } = mutation;
  console.log("mutation.error", mutation.error);
 
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate();
  };
  //Чтобы протипизировать response в mutation.error
  const err = mutation.error as unknown as TypeError;

  return (
    <>
      <div className="overlay_auth" onClick={() => setPopUpLogin(false)}></div>
      {isError && <div className="reg">{err.response.data.message}</div>}
      {isPending === true && <div className="loading">Загрузка...</div>}

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

        <button type="submit" className="button">
          Войти
        </button>
        <div onClick={() => setAuth(false)}>Регистрация</div>
      </form>
    </>
  );
};

//Без tanstack/react-query
// export const Auth = ({ setPopUpLogin, setAuth }: TypeProps) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<Error>({
//     response: { data: { message: "" } },
//   });

//   const [formData, setFormData] = useState({
//     email: "user@test.com",
//     password: "123",
//   });

//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     console.log(event.target.value);
//     const { name, value } = event.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//     //Валидация:
//     if (name === "email" && value !== " ") {
//       validateEmail({ value: value, setEmailError: setEmailError });
//     }
//     if (name === "password" && value !== " ") {
//       validatePassword({ value: value, setPasswordError: setPasswordError });
//     }
//   };

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const login = async () => {
//       setIsLoading(true);
//       try {
//         const result = await axios.post(
//           `${import.meta.env.VITE_BASE_URL}/auth/login`,
//           formData,
//           {
//             withCredentials: true,
//           }
//         );
//         console.log(result.data);
//         dispatch(userActions.setUser(result.data));

//         // if (result.data.role === "client") {
//         //   navigate("/cabinet");
//         // }
//         // if (result.data.role === "admin") {
//         //   navigate("/admin");
//         // }
//       } catch (error: Error | unknown) {
//         console.log(error);
//         setError(error as Error);
//       } finally {
//         setIsLoading(false);
//         console.log("cookies", document.cookie);
//         // !error && setPopUpLogin(false);
//       }
//     };

//     login();
//   };

//   return (
//     <>
//       <div className="overlay_auth" onClick={() => setPopUpLogin(false)}></div>
//       {error && <div className="reg">{error.response.data.message}</div>}
//       {isLoading === true && <div className="loading">Загрузка...</div>}

//       <form onSubmit={handleSubmit} className="form showTop">
//         <div className="nameError">{emailError}</div>
//         <input
//           type="email"
//           value={formData.email}
//           name="email"
//           onChange={handleChange}
//           placeholder="Логин: user@test.com"
//         />
//         <div className="nameError">{passwordError}</div>
//         <input
//           type="password"
//           value={formData.password}
//           name="password"
//           onChange={handleChange}
//           placeholder="Пароль: 123"
//         />

//         <button type="submit" className="button">
//           Войти
//         </button>
//         <div onClick={() => setAuth(false)}>Регистрация</div>
//       </form>
//     </>
//   );
// };
