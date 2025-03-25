import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./User.scss";
import { validateEmail, validateName } from "../../../components/Auth/validate";

type TypeUser = {
  email: string;
  fullName: string;
  id: string;
  role: string;
  createdAt: string;
};

export const User = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialState = {
    email: "",
    fullName: "",
    id: "",
    role: "",
    createdAt: "",
  };
  const [formData, setFormData] = useState<TypeUser>({ ...initialState });

  // Функция для сброса формы
  function resetForm() {
    Object.assign(formData, initialState);
  }

  // const [workNameError, setWorkNameError] = useState("");

  //Запрос для получения данных пользователя для начального состояния формы редактирования
  const getUser = async (id: string | undefined) => {
    const result = await axios.get<TypeUser>(
      `${import.meta.env.VITE_BASE_URL}/users/${id}`,
      {
        withCredentials: true,
      }
    );
    return result.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["getUser", id],
    //queryFn: (id не нужно прокидывать здесь) => getPost(id),
    queryFn: () => getUser(id),
    // onSuccess: (data: TypeUser) => {
    //   setFormData(data);
    // }
  });

  useEffect(() => {
    if (data === undefined) return;
    setFormData(data);
  }, [data]);

  //Стейты  для валидации:
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value);
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    //Валидация:
    if (name === "email" && value !== " ") {
      validateEmail({ value: value, setEmailError: setEmailError });
    }
    if (name === "fullName" && value !== " ") {
          validateName({ value, setNameError });
        }
  };

  //Запрос на обновление данных пользователя
  //Важно запрос с клиента д/б такой же как на сервере те"put, post не будет работать
  const updateUser = async (id: string | undefined) => {
    const result = await axios.put<TypeUser>(
      `${import.meta.env.VITE_BASE_URL}/users/update/${id}`,
      formData,
      {
        withCredentials: true,
      }
    );
    console.log("updateUser", result.data);
  };
  const queryClient = useQueryClient();

  const mutationUpdateUser = useMutation({
    mutationKey: ["updateUser", id],
    mutationFn: () => updateUser(id),
    //обновление данных по ключу getUsers
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getUsers"] }),
    onSettled: () => {
      resetForm();
      navigate("/admin/editUser"); 
    },
  });
  console.log("mutationUpdateUser.error", mutationUpdateUser.error);

  //Запрос на удаление пользователя
  const deleteUser = async (id: string | undefined) => {
    const result = await axios.delete<TypeUser>(
      `${import.meta.env.VITE_BASE_URL}/users/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log("updateUser", result.data);
  };

  const mutationDeleteUser = useMutation({
    mutationKey: ["deleteUser", id],
    mutationFn: () => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["getUsers"] }),
    onSettled: () => {
      resetForm();
      navigate("/admin/editUser");
    },
  });
  console.log("mutationDeleteUser.error", mutationDeleteUser.error);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutationUpdateUser.mutate();
  };

  return (
    <div className="wrapper_edit_user">
      <span>Редактирование пользователя</span>
      <form className="form_edit_user" onSubmit={handleSubmit} noValidate>
        
        <div className="lableOrder">Имя пользователя:</div>
        <div className="error_message">{nameError}</div>
        <input
          className="input_edit_user"
          type="text"
          value={formData.fullName}
          name="fullName"
          onChange={handleChange}
          placeholder="Имя пользователя"
        />

        <div className="lableOrder">Email:</div>
        <div className="error_message">{emailError}</div>
        <input
          className="input_edit_user"
          type="text"
          value={formData.email}
          name="email"
          onChange={handleChange}
          placeholder="email"
        />
        <button className="buttonEdit">
          {isLoading ? "Сохраняю..." : "Сохранить"}
        </button>
        <button
          onClick={() => mutationDeleteUser.mutate()}
          className="buttonEdit buttonDelete"
        >
          {isLoading ? "Удаление..." : "Удалить пользователя"}
        </button>
      </form>
    </div>
  );
};
