import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getMessagesByIdRequest } from "../api/messages";
import { getContactsRequest } from "../api/contacts";

export const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp debe estar dentro del proveedor TaskContext");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState();

  const getContacts = async () => {
    try {
      const res = await getContactsRequest();
      setContacts(res.data);
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
    <AppContext.Provider value={{ contacts, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node,
};
