import { useState } from "react";
import { RiEmotionHappyLine, RiLinkM } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { postMessageRequest } from "../api/contacts";
import { useApp } from "../hooks/useApp";
import ContainerIcon from "./ContainerIcon";

const SendMessage = () => {
  const { user } = useApp();
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendMessage(newMessage);
    setNewMessage("");
  };

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = async (newMessage) => {
    try {
      const data = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: user.profile.waId,
        type: "text",
        text: {
          preview_url: false,
          body: newMessage,
        },
      };
      await postMessageRequest(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex items-center justify-between bg-[var(--card-background-color)] broder-t-2 border-[var(--background-color)] p-2">
      <div className="flex">
        <ContainerIcon icon={<RiEmotionHappyLine />} />
        <ContainerIcon icon={<RiLinkM />} />
      </div>
      <form className="w-full " onSubmit={handleSubmit}>
        <input
          type="text"
          className=" w-full py-2 px-6 bg-[var(--card-background-color)] outline-none "
          placeholder="Escribe un mensaje"
          autoComplete="off"
          name="message"
          onChange={handleChange}
          value={newMessage}
        />
        <button type="submit" className="hidden">
          Enviar
        </button>
      </form>
      <ContainerIcon icon={<IoSend onClick={(e) => handleSubmit(e)} />} />
    </div>
  );
};

export default SendMessage;
