import img from "../assets/profilepicture1.jpg";
import { useApp } from "../hooks/useApp";
import UnreadMessagesBadge from "./UnreadMessagesBadge ";

const Contact = () => {
  const { contacts, getMessage, unread } = useApp();
  const sortedContacts = contacts.sort(
    (a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp
  );

  return (
    <>
      {sortedContacts?.map((user) => {
        const message = user.lastMessage;
        const date = new Date(message.timestamp * 1000);
        const hour = date.getHours();
        const minute = date.getMinutes();
        const name = user.profile.name;
        return (
          <div
            key={user._id}
            className=" pt-1 bg-[#222C32] border-b border-[#222C32] hover:cursor-pointer"
            onClick={() => getMessage(message.contactId)}
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
                  <span>
                    {hour}:{minute}
                  </span>
                  <UnreadMessagesBadge />
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
