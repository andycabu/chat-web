import { useApp } from "../context/AppContext";

const Contact = () => {
  const { contacts, setUser } = useApp();

  const contactMessagesMap = {};

  contacts.forEach((contact) => {
    const contactId = contact.contacts[0].waId;
    if (contactMessagesMap[contactId]) {
      contact.messages.forEach((message) => {
        if (
          !contactMessagesMap[contactId].messages.some(
            (m) => m._id === message._id
          )
        ) {
          contactMessagesMap[contactId].messages.push(message);
        }
      });
    } else {
      contactMessagesMap[contactId] = { ...contact };
    }
  });

  function findLastMessage(user) {
    const messages = user.messages;
    if (messages.length === 0) return null;
    return messages.reduce((prev, current) => {
      return parseInt(current.timestamp) > parseInt(prev.timestamp)
        ? current
        : prev;
    });
  }
  const sortedUsers = Object.values(contactMessagesMap).sort((a, b) => {
    const lastMessageA = findLastMessage(a);
    const lastMessageB = findLastMessage(b);
    if (!lastMessageA) return 1;
    if (!lastMessageB) return -1;
    return parseInt(lastMessageB.timestamp) - parseInt(lastMessageA.timestamp);
  });

  return (
    <>
      {sortedUsers.map((user) => {
        const message = findLastMessage(user);
        const date = new Date(message.timestamp * 1000);
        const hour = date.getHours();
        const minute = date.getMinutes();
        return (
          <div
            key={user._id}
            className=" pt-1 bg-[#222C32] border-b border-[#222C32] hover:cursor-pointer"
            onClick={() => setUser(user)}
          >
            <div className="hover:bg-[#1B2831] flex items-center gap-4 p-4">
              <img
                src="https://img.freepik.com/foto-gratis/retrato-joven-confiado-gafas_171337-4841.jpg"
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="flex-1 flex justify-between">
                <div>
                  <h2>{user.contacts[0].profile.name}</h2>
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
