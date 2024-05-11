import React, {useRef, useEffect} from "react";
import TypingIndicator from "./TypeIndicator";

type Message = {
  id: number;
  user: string;
  message: string;
};

type Props = {
  messages: Message[];
  isLoading: boolean;
};

const ChatBox: React.FC<Props> = ({ messages, isLoading }) => {
    const messagesEndRef = useRef(null);

   
    useEffect(() => {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }, [messages]);

  return (
    <div className="max-h-[70vh] overflow-y-scroll flex flex-col space-y-4 border-b border-primary-100 border-t p-4 overflow-auto h-[80vh] bg-white">
      {messages.map((msg) => (
        <div
          key={msg.id}
          ref={messagesEndRef}
          className={`flex ${
            msg.user === "bot" ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.user === "bot"
                ? "bg-primary-100 text-primary-300"
                : "bg-primary-200 text-primary-300"
            }`}
          >
            {msg.message}
          </div>
        </div>
      ))}
      {isLoading && <TypingIndicator />}
    </div>
  );
};

export default ChatBox;
