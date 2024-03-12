import { RiMore2Fill, RiSearchLine } from "react-icons/ri";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import img from "../assets/profilepicture1.jpg";
import { useApp } from "../hooks/useApp";
import { IoArrowBack } from "react-icons/io5";
import ContainerIcon from "./ContainerIcon";

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
    <div className="w-[70%] h-screen flex flex-col medium:w-full">
      <header className=" bg-[var(--card-background-color)] p-3 flex items-center justify-between border-b-2 border-[var(--background-color)]">
        <div className="flex items-center gap-4">
          <div
            onClick={() => setUser()}
            className=" hidden text-2xl justify-center hover:cursor-pointer medium:flex"
          >
            <ContainerIcon icon={<IoArrowBack />} />
          </div>
          <img src={img} className="w-10 h-10 object-cover rounded-full" />
          <div>
            <h2 className="font-bold">{name}</h2>
            <span className=" text-sm">En Linea</span>
          </div>
        </div>
        <div className="flex items-center gap-8 text-2xl ">
          <ContainerIcon icon={<RiSearchLine />} />
          <ContainerIcon icon={<RiMore2Fill />} />
        </div>
      </header>
      <Messages />
      <SendMessage />
    </div>
  );
};

export default Chat;
