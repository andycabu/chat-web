import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getContactsRequest,
  getContactsRequestById,
  getMessageUnread,
  postMessagesRead,
} from "../api/contacts";
import io from "socket.io-client";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState();
  const [unread, setUnread] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const socket = io("http://localhost:3000");
  useEffect(() => {
    socket.on(
      "newMessage",
      ({ contactId, message, contactIdRead, newStatus, messageId }) => {
        if (contactIdRead) {
          removeMessageById(contactIdRead);
        }
        if (contactId) {
          updateLastMessage(contactId, message);
          updateUnreadMessages(message);
        }
        if (newStatus) {
          updateUserMessagesStatus(messageId, newStatus);
        }
        if (user) {
          if (contactId === user.messages[0]?.contactId) {
            setUser((user) => ({
              ...user,
              messages: [...user.messages, message],
            }));
          }
        }
      }
    );
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      postMessagesRead({ contactId: activeUser });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      socket.disconnect();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user, activeUser, unread]);

  const updateUserMessagesStatus = (messageId, newStatus) => {
    if (user && user.messages) {
      const updatedMessages = user.messages.map((msg) => {
        if (msg.messageId === messageId) {
          return { ...msg, status: newStatus };
        }
        return msg;
      });

      setUser((currentUser) => ({
        ...currentUser,
        messages: updatedMessages,
      }));
    }
  };
  function removeMessageById(id) {
    const newUnread = unread.filter((messages) => messages._id !== id);
    setUnread(newUnread);
  }

  const changeUser = async (newUserId) => {
    if (activeUser) {
      await postMessagesRead({ contactId: activeUser });
    }

    setActiveUser(newUserId);
    getMessage(newUserId);
  };

  const updateUnreadMessages = (receivedMessage) => {
    if (
      receivedMessage.read === false &&
      activeUser !== receivedMessage.contactId
    ) {
      setUnread((currentUnread) => {
        const index = currentUnread.findIndex(
          (item) => item._id === receivedMessage.contactId
        );

        if (index > -1) {
          const updatedUnread = [...currentUnread];
          updatedUnread[index].count += 1;
          return updatedUnread;
        } else {
          return [
            ...currentUnread,
            { _id: receivedMessage.contactId, count: 1 },
          ];
        }
      });
    }
  };

  const updateLastMessage = (contactId, message) => {
    setContacts((contacts) =>
      contacts.map((contact) =>
        contact._id === contactId
          ? { ...contact, lastMessage: message }
          : contact
      )
    );
  };
  const MessageUnread = async () => {
    try {
      const res = await getMessageUnread();
      setUnread(res.data);
    } catch (error) {
      console.error("Error al obtener mensajes:", error);
    }
  };

  useEffect(() => {
    MessageUnread();
  }, []);

  const getContacts = async () => {
    try {
      const res = await getContactsRequest();
      setContacts(res.data);
    } catch (error) {
      console.error("Error al obtener mensajes:", error);
    }
  };
  const getMessage = async (id) => {
    try {
      const res = await getContactsRequestById(id);
      setUser(res.data);
    } catch (error) {
      console.error("Error al obtener mensajes:", error);
    }
  };

  useEffect(() => {
    if (contacts.length === 0) {
      getContacts();
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        contacts,
        user,
        unread,
        activeUser,
        setActiveUser,
        changeUser,
        removeMessageById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node,
};
