import { useApp } from "../context/AppContext";
import img from "../assets/profilepicture1.jpg";

const Contact = () => {
  const { contacts, setUser } = useApp();

  return (
    <>
      {contacts?.map((user) => {
        const message = user.messages[0];
        const date = new Date(message.timestamp * 1000);
        const hour = date.getHours();
        const minute = date.getMinutes();
        const name = user.contact[0].profile.name;
        return (
          <div
            key={user._id}
            className=" pt-1 bg-[#222C32] border-b border-[#222C32] hover:cursor-pointer"
            onClick={() => setUser(user)}
          >
            <div className="hover:bg-[#1B2831] flex items-center gap-4 p-4">
              <img src={img} className="w-10 h-10 object-cover rounded-full" />
              <div className="flex-1 flex justify-between">
                <div>
                  <h2>{name}</h2>
                  <p
                    className="text-gray-500 "
                    style={{
                      maxWidth: "200px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {message.text.body}
                  </p>
                </div>
                <div className="text-sm text-gray-500">
                  {hour}:{minute}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Contact;
