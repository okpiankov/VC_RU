import "./Chat.scss";
import { Send } from "lucide-react";

export const Chat = ({
  setDrawerChat,
}: {
  setDrawerChat: (drawerChat: boolean) => void;
}) => {
  const messages = [
    {
      id: "1",
      $createdAt: "30-01-2025",
      text: "Привет. Давай обсудим детали?",
      author: "Опытный юзер",
    },
    {
      id: "2",
      $createdAt: "30-01-2025",
      text: "Хорошо. Что тебя интересует?",
      author: "Анатолий Вассерман",
    },
    {
      id: "3",
      $createdAt: "30-01-2025",
      text: " Как ты считаешь ИИ-модели мыслят точно так же или очень похоже на людей?",
      author: "Опытный юзер",
    },
    { 
      id: "4",
      $createdAt: "30-01-2025",
      text: "На самом деле ИИ-системы работают и принимают решения, следуя алгоритмам, полученным данным и запрограммированной логике. В отличие от людей, которые мыслят творчески и эмоционально, ИИ не обладает сознанием и самосознанием.",
      author: "Анатолий Вассерман",
    },
    {
      id: "5",
      $createdAt: "30-01-2025",
      text: "Заменит ли  ИИ все рабочие места?",
      author: "Опытный юзер",
    },
    {
      id: "6",
      $createdAt: "30-01-2025",
      text: "Хотя ИИ автоматизирует некоторые задачи, он не заменит целые профессии. Наоборот, он изменит характер работы. Профессии, требующие решения проблем, эмоционального интеллекта и творческого подхода, в том числе преподавание, здравоохранение и руководство, не обязательно будут автоматизированы.",
      author: "Анатолий Вассерман",
    },
    {
      id: "7",
      $createdAt: "30-01-2025",
      text: "Во время промышленной революции люди думали, что машины полностью устранят необходимость в человеческом труде. На самом деле произошел бум в промышленности, создании рабочих мест и занятости. Таким образом, ИИ лишь дополнит возможности человека, а не вытеснит его. Потребует от людей адаптации и приобретения новых навыков, чтобы они могли преуспевать наряду с машинами.",
      author: "Анатолий Вассерман",
    },
  ];

  return (
    <>
      <div onClick={() => setDrawerChat(false)} className="overlay_chat"></div>
      <div className="container_chat showRight">
        <form className="form_chat">
          <textarea placeholder="Введите сообщение" className="textarea"></textarea>
          
          <button  className="button_chat">
            <Send className="button_icon"/>
          </button>
        </form>
        <div className="container_message">
        {messages.length > 0 && 
          messages?.map((message) => (
            <div key={message.id} className={` ${message.author === "Опытный юзер" ? 'message_box2' : 'message_box1'}`}>
              <div className="message_title">
                <div className="message_author">{message.author}</div>
                <div>{message.$createdAt}</div>
              </div>
              {message.text}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
