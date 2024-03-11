import { useState } from "react";
import { RiEmotionHappyLine, RiLinkM } from "react-icons/ri";
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
    <div className="h-[8vh]  flex items-center justify-between bg-[var(--card-background-color)] broder-t-2 border-[var(--background-color)]">
      <div className=" flex text-2xl justify-center hover:cursor-pointer ml-2 ">
        <div className="p-3 hover:bg-[var(--background-color)] rounded-md">
          <RiEmotionHappyLine />
        </div>
      </div>
      <div className=" flex text-2xl justify-center hover:cursor-pointer ml-2 ">
        <div className="p-3 hover:bg-[var(--background-color)] rounded-md">
          <RiLinkM />
        </div>
      </div>
      <form className="w-[60%] xl:w-10/12" onSubmit={handleSubmit}>
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
      <div className=" flex text-2xl justify-center hover:cursor-pointer  ">
        <div className="p-3 hover:bg-[var(--background-color)] rounded-md mr-2">
          <IoSend onClick={(e) => handleSubmit(e)} />
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
