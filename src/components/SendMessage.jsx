import { useState } from "react";
import { RiEmotionHappyLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { postMessageRequest } from "../api/contacts";
import { useApp } from "../hooks/useApp";

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
    <div className="h-[8vh] text-gray-500 flex items-center bg-[#1B2831]">
      <div className="w-[20%] xl:w-1/12 flex justify-center text-2xl">
        <RiEmotionHappyLine className="hover:cursor-pointer" />
      </div>
      <form className="w-[60%] xl:w-10/12" onSubmit={handleSubmit}>
        <input
          type="text"
          className="bg-[#0B131A] w-full py-2 px-6 rounded-full outline-none text-gray-300"
          placeholder="Escribe un mensaje aquì"
          autoComplete="off"
          name="message"
          onChange={handleChange}
          value={newMessage}
        />
        <button type="submit" className="hidden">
          Enviar
        </button>{" "}
      </form>
      <div className="w-[20%] xl:w-1/12 flex justify-center text-2xl">
        <IoSend
          className="hover:cursor-pointer hover:text-red-100"
          onClick={(e) => handleSubmit(e)}
        />
      </div>
    </div>
  );
};

export default SendMessage;
