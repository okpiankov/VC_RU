import axios from "axios";
import "./EditChat.scss";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Eye, Trash2 } from "lucide-react";
import dayjs from "dayjs";

type TypeChatMessages = {
  text: string;
  userName: string;
  userId: string;
  createdAt: string;
  id: string;
};

export const EditChat = () => {

  //Получение всех сообщений из чата
  const getChatMessages = async () => {
    const result = await axios.get<TypeChatMessages[]>(
      `${import.meta.env.VITE_BASE_URL}/messages`,
      {
        withCredentials: true,
      }
    );
    return result.data;
  };

  const query = useQuery({
    queryKey: ["getChatMessages"],
    queryFn: () => getChatMessages(),
  });
  const { data, error, isLoading } = query;
  console.log("getChatMessages:", data, "error:", error);

  //Запрос на удаление сообщения
  const deleteChatMessage = async (id: string) => {
    const result = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/messages/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log("deleteChatMessage", result.data);
  };

  const mutationDeleteChatMessage = useMutation({
    mutationKey: ["deleteChatMessage"],
    // нужно добавить тип в mutationFn: (id: string)!!!
    mutationFn: (id: string) => deleteChatMessage(id),
    onSuccess: () => {
      query.refetch();
    },
  });
  console.log("mutationDeleteChatMessage.error", mutationDeleteChatMessage.error);

  return (
    <div className="container_edit_сhat">
      <div className="title_admin">Чат</div>

      <div className="сhat_list">
        {isLoading && <div className="loading">Загрузка...</div>}

        <div className="header_edit_сhat">
          <div className="header_position">id сообщения</div>
          <div className="header_position">Имя автора</div>
          <div className="header_position">Текст</div>
          <div className="header_position">Дата создания</div>
          <Trash2 className="icon_admin" />
        </div>
        <ul>
          {data?.map((chat) => (
            <li key={chat.id}>
              <div className="position">{chat.id}</div>
              <div className="position">{chat.userName}</div>
              <div className="position">{chat.text}</div>
              <div className="position">
                {dayjs(chat.createdAt).format("H:m /DD MMMM YYYY")}
              </div>

              <Trash2
                className="icon_admin"
                onClick={() => mutationDeleteChatMessage.mutate(chat.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
