import React from "react";
import img from "../assets/profilepicture1.jpg";
import { useApp } from "../hooks/useApp";
import UnreadMessagesBadge from "./UnreadMessagesBadge ";
import { postMessagesRead } from "../api/contacts";

const Contact = () => {
  const {
    contacts,
    unread,
    setActiveUser,
    changeUser,
    removeMessageById,
    activeUser,
  } = useApp();
  const sortedContacts = contacts.sort(
    (a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp
  );
  const getUnreadMessageCount = (userId) => {
    const unreadMsg = unread.find((unreadMsg) => unreadMsg._id === userId);
    return unreadMsg ? unreadMsg.count : 0; // Retorna el conteo si encuentra un objeto, de lo contrario 0
  };
  const handleUserChange = (newUserId) => {
    changeUser(newUserId);
  };

  return (
    <>
      {sortedContacts?.map((user) => {
        const unreadCount = getUnreadMessageCount(user._id);
        const message = user.lastMessage;
        const date = new Date(message.timestamp * 1000);
        const hour = date.getHours();
        const minute = date.getMinutes();
        const name = user.profile.name;
        const isActive = activeUser === user._id;

        return (
          <div
            key={user._id}
            className="pt-1 px-3  hover:cursor-pointer"
            onClick={() => {
              postMessagesRead({ contactId: user._id }),
                handleUserChange(message.contactId);
              setActiveUser(user._id);
              removeMessageById(user._id);
            }}
          >
            <div
              className={`${
                isActive ? "bg-[var(--color-primary)] text-white" : ""
              } hover:bg-[var(--color-primary-hover)] hover:text-white  rounded-md  flex items-center gap-4 p-4`}
            >
              <img
                src={img}
                alt="Profile"
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="flex-1 flex justify-between">
                <div className="">
                  <h2 className="font-bold">{name}</h2>
                  <p className="max-w-[200px] overflow-hidden text-ellipsis">
                    {message.text.body}
                  </p>
                </div>
                <div className="text-sm flex flex-col items-center gap-1">
                  <span>
                    {hour.toString().padStart(2, "0")}:
                    {minute.toString().padStart(2, "0")}
                  </span>
                  {unreadCount > 0 && (
                    <UnreadMessagesBadge count={unreadCount} />
                  )}
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
