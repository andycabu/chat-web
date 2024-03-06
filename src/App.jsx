import {
  RiLoader3Line,
  RiChatPollFill,
  RiMore2Fill,
  RiSearchLine,
} from "react-icons/ri";
import Chat from "./components/Chat";
import Contacts from "./components/Contacts";

function App() {
  return (
    <div className="min-h-screen flex  text-gray-300">
      {/* Contacts */}
      <div className="min-w-[360px] bg-[#1B2831] flex flex-col">
        {/* Profile */}
        <div className="p-4 h-[15vh]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <img
                src="https://img.freepik.com/psd-gratis/estudiante-alegre-idea_1154-280.jpg"
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>
            <div className="flex items-center gap-8 text-2xl text-gray-500">
              <RiLoader3Line className="hover:cursor-pointer" />
              <RiChatPollFill className="hover:cursor-pointer" />
              <RiMore2Fill className="hover:cursor-pointer" />
            </div>
          </div>
          <form className="w-full">
            <div className="relative">
              <RiSearchLine className="absolute top-1/2 -translate-y-1/2 left-4" />
              <input
                className="bg-[#0B131A] w-full rounded-full py-2 pl-10 pr-4 outline-none"
                placeholder="Buscar o empezar un chat nuevo"
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
