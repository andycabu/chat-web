import { useState } from "react";
import { RiEmotionHappyLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import { addMessageRequest } from "../api/messages";

const SendMessage = () => {
  const [newMessage, setNewMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(newMessage);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setNewMessage((prevNewMessage) => ({
      ...prevNewMessage,
      [name]: value,
    }));
  };

  const sendMessage = async (newMessage) => {
    try {
      const data = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: "34658742600",
        type: "text",
        text: {
          preview_url: false,
          body: newMessage["message"],
        },
      };
      const res = await addMessageRequest(data);

      if (res.status === 200) {
        clearInput();
        console.log("Message sent successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearInput = () => {
    setNewMessage({ message: "" });
  };
  return (
    <div className="h-[8vh] text-gray-500 flex items-center bg-[#1B2831]">
      <div className="w-[20%] xl:w-1/12 flex justify-center text-2xl">
        <RiEmotionHappyLine className="hover:cursor-pointer" />
      </div>
      <form className="w-[60%] xl:w-10/12">
        <input
          type="text"
          className="bg-[#0B131A] w-full py-2 px-6 rounded-full outline-none text-gray-300"
          placeholder="Escribe un mensaje aquì"
          autoComplete="off"
          name="message"
          onChange={handleChange}
        />
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
