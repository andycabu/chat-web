import { useEffect, useRef } from "react";
import { useApp } from "../hooks/useApp";
import Ticks from "./Ticks";

const Messages = () => {
  const { user } = useApp();
  const messagesEndRef = useRef(null);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = {
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
    <main className="overflow-y-auto h-full p-4 bg-[var(--background-color)]">
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
          message.direction === "sent"
            ? "bg-[var(--color-secundary)] text-white"
            : "bg-[var(--color-primary)] text-white";

        return (
          <div key={message._id}>
            {showDateLabel && (
              <div key={index} className="text-center my-2">
                <span className="bg-[var(--card-background-color)] rounded-md p-1">
                  {showFullDate
                    ? day
                    : date.toLocaleDateString("es-ES", { weekday: "long" })}
                </span>
              </div>
            )}
            <div className={`mb-2 flex ${messageAlignment}`}>
              <div
                className={`flex flex-col ${messageBgColor} max-w-[480px] min-w-[110px] xl:max-w-2xl rounded-xl`}
              >
                <p className="break-words px-2 pt-1">{message.text.body}</p>
                <div className="flex justify-end items-center px-2">
                  <span className="text-[0.70rem]">{`${hour}:${minute}`}</span>
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
