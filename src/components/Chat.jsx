import { RiMore2Fill, RiSearchLine } from "react-icons/ri";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import img from "../assets/profilepicture1.jpg";
import { useApp } from "../hooks/useApp";
import { IoArrowBack } from "react-icons/io5";

const Chat = () => {
  const { user, setUser } = useApp();
  const name = user?.profile.name;
  if (!user) {
    return (
      <div className="flex justify-center items-center w-full bg-[var(--card-background-color)] small:hidden">
        <h2 className="text-lg ">Escoge un chat de la lista</h2>
      </div>
    );
  }
  return (
    <div className="w-full h-screen flex flex-col">
      <header className=" bg-[var(--card-background-color)] p-4 flex items-center justify-between border-b-2 border-[var(--background-color)]">
        <div className="flex items-center gap-4">
          <div
            onClick={() => setUser()}
            className=" flex text-2xl justify-center hover:cursor-pointer"
          >
            <div className="p-3 hover:bg-[var(--background-color)] rounded-md">
              <IoArrowBack />
            </div>
          </div>
          <img src={img} className="w-10 h-10 object-cover rounded-full" />
          <div>
            <h2 className="font-bold">{name}</h2>
            <span className=" text-sm">En Linea</span>
          </div>
        </div>
        <div className="flex items-center gap-8 text-2xl ">
          <RiSearchLine className="hover:cursor-pointer" />
          <RiMore2Fill className="hover:cursor-pointer" />
        </div>
      </header>
      <Messages />
      <SendMessage />
    </div>
  );
};

export default Chat;
