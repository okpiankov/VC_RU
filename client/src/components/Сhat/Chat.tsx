//socket.emit(event, data) — метод библиотеки Socket.IO, который позволяет отправлять
//сообщения (события) конкретному клиенту, связанному с объектом сокета
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import "./Chat.scss";
import { Send, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { getUser } from "../../store/user/slice";
import { io, Socket } from "Socket.IO-client";
// import { io, Socket } from "Socket.io-client";
import dayjs from "dayjs";
// import { Message, Prisma } from "@prisma/client";

type TypeProps = {
  setDrawerChat: (drawerChat: boolean) => void;
};
type TypeMessageGet = {
  id: string;
  text: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};
type TypeMessagePost = {
  text: string;
  userName: string | null;
  userId: string | null;
};
//экземпляр сокета
let socket: Socket;
export const Chat = ({ setDrawerChat }: TypeProps) => {
  const user = useSelector(getUser);

  //экземпляр сокета
  // let socket: Socket;
  // console.log(Socket)

  // useEffect(() => {
    //важно: один пользователь - один сокет
    if (!socket) {
      socket = io("http://localhost:5555/chat", {
        query: {
          userName: user.fullName,
        },
      });
    }
  // }, [user]);

  //Для отправки сообщения
  // const [formData, setFormData] = useState({
  //   text: "",
  //   userId: user.id,
  //   userName: user.fullName,
  // });
  //initialState для отправки формы комментария
  const initialState = {
    text: "",
    userId: user.id,
    userName: user.fullName,
  };
  const [formData, setFormData] = useState<TypeMessagePost>({
    ...initialState,
  });

  // Функция для очистки формы после отправки
  function resetForm() {
    Object.assign(formData, initialState);
  }
  //Для получения всех сообщений
  const [messages, setMessages] = useState<TypeMessageGet[] | []>([]);
  const [log, setLog] = useState<string>();

  useEffect(() => {
    // подключение/отключение пользователя
    socket.on("log", (log: string) => {
      setLog(log);
      console.log("log", log);
    });
    // получение сообщений
    socket.on("messages", (messages: TypeMessageGet[]) => {
      setMessages(messages);
    });

    socket.emit("messages:get");
  }, []);

  // отправка сообщения
  const send = useCallback((payload: TypeMessagePost) => {
    socket.emit("message:post", payload);
  }, []);

  // удаление всех сообщений
  const remove = useCallback(() => {
    socket.emit("messages:clear");
    // получение сообщений
    socket.on("messages", (messages: TypeMessageGet[]) => {
      setMessages(messages);
    });
    socket.emit("messages:get");
  }, []);

  // //отключение пользователя
  //  const close = useCallback(() => socket.on("disconnect", () => {
  //   console.log('socket.disconnected',socket.disconnected);
  //   socket.emit("disconnect");
  // }), []);

  // // обновление сообщения
  // const update = useCallback((payload: MessageUpdatePayload) => {
  //   socket.emit("message:put", payload);
  // }, []);

  // // удаление сообщения
  // const remove = useCallback((payload: Prisma.MessageWhereUniqueInput) => {
  //   socket.emit("message:delete", payload);
  // }, []);

  // const chatActions = useMemo(
  //   () => ({
  //     send,
  //     remove,
  //     // update,
  //   }),
  //   []
  // );
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(formData);
    resetForm();
  };

  if (messages === undefined) return;
  return (
    <>
      <div
        onClick={() => {
          setDrawerChat(false);
        }}
        className="overlay_chat"
      ></div>
      <div className="container_chat showRight">
        <form className="form_chat" onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            value={formData.text}
            name="text"
            placeholder="Введите сообщение"
            className="textarea"
          ></textarea>

          <button className="button_chat">
            <Send className="button_icon" />
          </button>
        </form>
        <Trash2 className="delete" onClick={() => remove()} />
        <div className="container_message">
          {messages.length > 0 &&
            messages?.map((message) => (
              <div
                key={message.id}
                className={` ${
                  message.userName === user.fullName
                    ? "message_box2"
                    : "message_box1"
                }`}
              >
                <div className="message_title">
                  <div className="message_author">{message.userName}</div>
                  <div>
                    {dayjs(message.createdAt).format("H:m /DD MMMM YYYY")}
                  </div>
                </div>
                {message.text}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

// export const Chat = ({
//   setDrawerChat,
// }: {
//   setDrawerChat: (drawerChat: boolean) => void;
// }) => {
//   const messages = [
//     {
//       id: "1",
//       $createdAt: "30-01-2025",
//       text: "Привет. Давай обсудим детали?",
//       author: "Опытный юзер",
//     },
//     {
//       id: "2",
//       $createdAt: "30-01-2025",
//       text: "Хорошо. Что тебя интересует?",
//       author: "Анатолий Вассерман",
//     },
//     {
//       id: "3",
//       $createdAt: "30-01-2025",
//       text: " Как ты считаешь ИИ-модели мыслят точно так же или очень похоже на людей?",
//       author: "Опытный юзер",
//     },
//     {
//       id: "4",
//       $createdAt: "30-01-2025",
//       text: "На самом деле ИИ-системы работают и принимают решения, следуя алгоритмам, полученным данным и запрограммированной логике. В отличие от людей, которые мыслят творчески и эмоционально, ИИ не обладает сознанием и самосознанием.",
//       author: "Анатолий Вассерман",
//     },
//     {
//       id: "5",
//       $createdAt: "30-01-2025",
//       text: "Заменит ли  ИИ все рабочие места?",
//       author: "Опытный юзер",
//     },
//     {
//       id: "6",
//       $createdAt: "30-01-2025",
//       text: "Хотя ИИ автоматизирует некоторые задачи, он не заменит целые профессии. Наоборот, он изменит характер работы. Профессии, требующие решения проблем, эмоционального интеллекта и творческого подхода, в том числе преподавание, здравоохранение и руководство, не обязательно будут автоматизированы.",
//       author: "Анатолий Вассерман",
//     },
//     {
//       id: "7",
//       $createdAt: "30-01-2025",
//       text: "Во время промышленной революции люди думали, что машины полностью устранят необходимость в человеческом труде. На самом деле произошел бум в промышленности, создании рабочих мест и занятости. Таким образом, ИИ лишь дополнит возможности человека, а не вытеснит его. Потребует от людей адаптации и приобретения новых навыков, чтобы они могли преуспевать наряду с машинами.",
//       author: "Анатолий Вассерман",
//     },
//   ];
//   const user = useSelector(getUser);
//   const [isLoading, setIsLoading] = useState(false);
// const [socket, setSocket] = useState([]);

// const getPosts = async () => {
//   setIsLoading(true);
//   try {
//     // const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`);
//     const result = await axios.get("http://localhost:7777");
//     console.log("PostsList", result.data);
//     setSocket(result.data);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setIsLoading(false);
//   }
// };
// useEffect(() => {
//   getPosts();
// }, []);

//   return (
//     <>
//       <div onClick={() => setDrawerChat(false)} className="overlay_chat"></div>
//       <div className="container_chat showRight">
//         <form className="form_chat">
//           <textarea placeholder="Введите сообщение" className="textarea"></textarea>

//           <button  className="button_chat">
//             <Send className="button_icon"/>
//           </button>
//         </form>
//         <div className="container_message">
//         {messages.length > 0 &&
//           messages?.map((message) => (
//             <div key={message.id} className={` ${message.author === "Опытный юзер" ? 'message_box2' : 'message_box1'}`}>
//               <div className="message_title">
//                 <div className="message_author">{message.author}</div>
//                 <div>{message.$createdAt}</div>
//               </div>
//               {message.text}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// const close = () => {
//   return socket.on("log", (log: string) => {
//     setLog(log);
//     console.log("log", log);

//   })
// };
