import { ChangeEvent, FormEvent, useState } from "react";
import "./Registration.scss";
import { validateEmail, validateName, validatePassword } from "./validate";
import axios from "axios";

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

export const Registration = ({ setPopUpLogin }: TypeProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [registration, setRegistration] = useState<TypeUserGet>({
    id: "",
    fullName: "",
    email: "",
    role: "",
  });

  // Определение начального состояния
  const initialState = {
    fullName: "",
    email: "",
    password: "",
    role: "client",
  };

  const [formData, setFormData] = useState<TypeUserCreate>({ ...initialState });

  // Функция для сброса формы
  function resetForm() {
    Object.assign(formData, initialState);
  }

  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const registration = async () => {
      setIsLoading(true);
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/registration`,
          formData,
          {
            withCredentials: true,
          }
        );
        console.log(result.data);

        setRegistration(result.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    registration();
  };

  return (
    <>
      <div className="overlay_reg" onClick={() => setPopUpLogin(false)}></div>
      {registration.fullName && (
        <div className="reg">Вы успешно зарегистрировались!</div>
      )}
      <form onSubmit={handleSubmit} className="form showTop" noValidate>
        <div className="nameError">{nameError}</div>
        <input
          type="text"
          value={formData.fullName}
          name="fullName"
          onChange={handleChange}
          placeholder="Введите ваше имя*"
        />

        <div className="nameError">{emailError}</div>
        <input
          type="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
          placeholder="Почта ваш логин*"
        />

        <div className="nameError">{passwordError}</div>
        <input
          type="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
          placeholder="Придумайте пароль*"
        />

        <button type="submit" className="button" onClick={() => resetForm()}>
          Зарегистрироваться
        </button>
      </form>
    </>
  );
};
