import { RiChatPollFill, RiMore2Fill, RiSearchLine } from "react-icons/ri";
import Chat from "./components/Chat";
import Contacts from "./components/Contacts";
import DayNight from "./components/DayNight";

function App() {
  return (
    <div className="min-h-screen flex text-[var(--text-color)]">
      <div className="min-w-[360px] bg-[var(--card-background-color)] flex flex-col border-r-2 border-[var(--background-color)] w-1/2">
        <div className="p-4 ">
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold">
              <h1>Chats</h1>
            </div>
            <div className="flex items-center gap-8 text-2xl text-gray-500">
              <DayNight />
              <RiChatPollFill className="hover:cursor-pointer" />
              <RiMore2Fill className="hover:cursor-pointer" />
            </div>
          </div>
          <form className="w-full">
            <div className="relative">
              <RiSearchLine className="absolute top-1/2 -translate-y-1/2 left-4" />
              <input
                className="bg-[var(--background-color)] w-full rounded-md py-2 pl-10 pr-4 outline-none"
                placeholder="Busca un chat o inicia uno nuevo."
              />
            </div>
          </form>
        </div>
        <Contacts />
      </div>
      <Chat />
    </div>
  );
}

export default App;
