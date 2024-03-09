import { useEffect, useRef } from "react";
import { useApp } from "../hooks/useApp";
import Ticks from "./Ticks";

const Messages = () => {
  const { user } = useApp();
  const messagesEndRef = useRef(null);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("es-ES", options);
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const isLessThanTwoDaysAgo = (timestamp) => {
    const twoDaysInSeconds = 2 * 24 * 60 * 60;
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime - timestamp < twoDaysInSeconds;
  };
  useEffect(() => {
    scrollToBottom();
  }, [user.messages]);

  user.messages.sort((a, b) => a.timestamp - b.timestamp);

  let currentDay = null;
  return (
    <main className="h-[84vh] overflow-y-auto p-4">
      {user?.messages.map((message, index) => {
        const date = new Date(message.timestamp * 1000);
        const hour = date.getHours().toString().padStart(2, "0");
        const minute = date.getMinutes().toString().padStart(2, "0");
        const day = formatDate(message.timestamp);
        const showDateLabel = day !== currentDay;
        if (showDateLabel) {
          currentDay = day;
        }

        const showFullDate = !isLessThanTwoDaysAgo(message.timestamp);
        const messageAlignment =
          message.direction === "sent" ? "justify-end" : "justify-start";
        const messageBgColor =
          message.direction === "sent" ? "bg-[#1B2831]" : "bg-[#054640]";

        return (
          <div key={message._id}>
            {showDateLabel && (
              <div key={index} className="text-center my-2">
                {showFullDate
                  ? day
                  : date.toLocaleDateString("es-ES", { weekday: "long" })}
              </div>
            )}
            <div className={`mb-3 flex ${messageAlignment}`}>
              <div
                className={`flex ${messageBgColor} max-w-[80%] xl:max-w-2xl py-1 px-2 rounded-xl`}
              >
                <p className="max-w-[400px] break-words">{message.text.body}</p>
                <div className="pt-5 pl-4 flex">
                  <p className="ml-auto text-[0.70rem] text-grey-dark ">
                    {`${hour}:${minute}`}
                  </p>
                  {message.direction === "sent" && (
                    <Ticks status={message.status} />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </main>
  );
};

export default Messages;
