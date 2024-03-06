import { RiLinkM, RiMore2Fill, RiSearchLine } from "react-icons/ri";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import { useApp } from "../context/AppContext";

const Chat = () => {
  const { user } = useApp();
  console.log("user", user);
  const name = user?.contacts[0].profile.name;
  if (!user) {
    return (
      <div className="flex justify-center items-center w-full">
        <h2 className="text-lg text-gray-500">Escoge un chat de la lista</h2>
      </div>
    );
  }
  return (
    <div className="w-full">
      <header className="h-[8vh] bg-[#1B2831] p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://img.freepik.com/psd-gratis/estudiante-alegre-idea_1154-280.jpg"
            className="w-10 h-10 object-cover rounded-full"
          />
          <div>
            <h2>{name}</h2>
            <span className="text-gray-500 text-sm">En Linea</span>
          </div>
        </div>
        <div className="flex items-center gap-8 text-2xl text-gray-500">
          <RiSearchLine className="hover:cursor-pointer" />
          <RiLinkM className="hover:cursor-pointer" />
          <RiMore2Fill className="hover:cursor-pointer" />
        </div>
      </header>
      <Messages />
      <SendMessage />
    </div>
  );
};

export default Chat;
