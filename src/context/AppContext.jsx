import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getContactsRequest,
  getContactsRequestById,
  getMessageUnread,
} from "../api/contacts";
import io from "socket.io-client";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("newMessage", ({ contactId, message }) => {
      if (contactId) {
        updateLastMessage(contactId, message);
      }
      if (user) {
        if (contactId === user.messages[0]?.contactId) {
          setUser((user) => ({
            ...user,
            messages: [...user.messages, message],
          }));
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);
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
      setUnread(res.data[0]);
    } catch (error) {
      console.error("Error al obtener mensajes:", error);
    }
  };

  useEffect(() => {
    MessageUnread();
  }, []);
  console.log(unread);
  console.log(contacts);

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
    <AppContext.Provider value={{ contacts, user, getMessage }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node,
};
