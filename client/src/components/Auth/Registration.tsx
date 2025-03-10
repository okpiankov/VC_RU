import { ChangeEvent, FormEvent, useState } from "react";
import "./Registration.scss";
import { validateEmail, validateName, validatePassword } from "./validate";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

type TypeProps = {
  setPopUpLogin: (popUpLogin: boolean) => void;
};
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

export const Registration = ({ setPopUpLogin }: TypeProps) => {
  const [user, setUser] = useState<TypeUserGet>({
    id: "",
    fullName: "",
    email: "",
    role: "",
  });

  // Определение начального состояния
  const initialState = {
    fullName: "",
    email: "user@test.com",
    password: "123",
    role: "client",
  };

  const [formData, setFormData] = useState<TypeUserCreate>({ ...initialState });

  // Функция для сброса формы
  function resetForm() {
    Object.assign(formData, initialState);
  }

  //Стейты  для валидации:
  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(event.target.value);
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "fullName" && value !== " ") {
      validateName({ value, setNameError });
    }
    if (name === "email" && value !== " ") {
      validateEmail({ value, setEmailError });
    }
    if (name === "password" && value !== " ") {
      validatePassword({ value, setPasswordError });
    }
  };

  // const validateForm = (validateName, validateEmail, validatePassword) => { {

  // }
  const registration = async () => {
    const result = await axios.post<TypeUserGet>(
      `${import.meta.env.VITE_BASE_URL}/auth/registration`,
      formData
      // {
      //   withCredentials: true,
      // }
    );
    console.log("user", result.data);

    setUser(result.data);
    console.log("cookies", document.cookie);
    resetForm();
  };

  const mutation = useMutation({
    mutationKey: ["registration"],
    mutationFn: () => registration(),
  });
  console.log("mutation.error", mutation.error);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Проверка на валидность перед отправкой формы
    if (
      formData.fullName === "" ||
      nameError !== "" ||
      formData.email === "" ||
      emailError !== "" ||
      formData.password === "" ||
      passwordError !== ""
    ) {
      setError("Поля не валидны, попробуйте еще раз");
      return;
    }
    mutation.mutate();
  };

  //Чтобы протипизировать response в mutation.error
  const err = mutation.error as unknown as TypeError;
  return (
    <>
      <div className="overlay_reg" onClick={() => setPopUpLogin(false)}></div>
      {mutation.isPending === true && (
        <div className="loading">Загрузка...</div>
      )}
      {mutation.isError && (
        <div className="reg">{err.response.data.message}</div>
      )}
      {error && !user.email && <div className="reg">{error}</div>}
      {user.email && <div className="reg">Вы успешно зарегистрировались!</div>}

      <form onSubmit={handleSubmit} className="form showTop" noValidate>
        <div className="nameError">{nameError}</div>
        <input
          required
          type="text"
          value={formData.fullName}
          name="fullName"
          onChange={handleChange}
          placeholder="Введите ваше имя*"
        />

        <div className="nameError">{emailError}</div>
        <input
          required
          type="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
          // placeholder="Почта ваш логин*"
          placeholder="user@test.com"
        />

        <div className="nameError">{passwordError}</div>
        <input
          required
          type="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          placeholder="Придумайте пароль*"
        />

        <button type="submit" className="button">
          Зарегистрироваться
        </button>
      </form>
    </>
  );
};

//Без tanstack/react-query
// export const Registration = ({ setPopUpLogin }: TypeProps) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [registration, setRegistration] = useState<TypeUserGet>({
//     id: "",
//     fullName: "",
//     email: "",
//     role: "",
//   });

//   // Определение начального состояния
//   const initialState = {
//     fullName: "",
//     email: "user@test.com",
//     password: "123",
//     role: "client",
//   };

//   const [formData, setFormData] = useState<TypeUserCreate>({ ...initialState });

//   // Функция для сброса формы
//   function resetForm() {
//     Object.assign(formData, initialState);
//   }

//   const [nameError, setNameError] = useState<string>("");
//   const [emailError, setEmailError] = useState<string>("");
//   const [passwordError, setPasswordError] = useState<string>("");

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     console.log(event.target.value);
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));

//     if (name === "fullName" && value !== " ") {
//       validateName({ value, setNameError });
//     }
//     if (name === "email" && value !== " ") {
//       validateEmail({ value, setEmailError });
//     }
//     if (name === "password" && value !== " ") {
//       validatePassword({ value, setPasswordError });
//     }
//   };

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const registration = async () => {
//       setIsLoading(true);
//       try {
//         const result = await axios.post(
//           `${import.meta.env.VITE_BASE_URL}/auth/registration`,
//           formData,
//           // {
//           //   withCredentials: true,
//           // }
//         );
//         console.log(result.data);

//         setRegistration(result.data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         resetForm()
//         setIsLoading(false);
//         console.log('cookies',document.cookie);
//       }
//     };

//     registration();
//   };

//   return (
//     <>
//       <div className="overlay_reg" onClick={() => setPopUpLogin(false)}></div>
//       {registration.fullName && (
//         <div className="reg">Вы успешно зарегистрировались!</div>
//       )}
//       <form onSubmit={handleSubmit} className="form showTop" noValidate>
//         <div className="nameError">{nameError}</div>
//         <input
//           type="text"
//           value={formData.fullName}
//           name="fullName"
//           onChange={handleChange}
//           placeholder="Введите ваше имя*"
//         />

//         <div className="nameError">{emailError}</div>
//         <input
//           type="email"
//           value={formData.email}
//           name="email"
//           onChange={handleChange}
//           // placeholder="Почта ваш логин*"
//           placeholder="user@test.com"
//         />

//         <div className="nameError">{passwordError}</div>
//         <input
//           type="password"
//           value={formData.password}
//           name="password"
//           onChange={handleChange}
//           placeholder="Придумайте пароль*"
//         />

//         <button type="submit" className="button">
//           Зарегистрироваться
//         </button>
//       </form>
//     </>
//   );
// };
