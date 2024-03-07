import {
  Component,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import { getContactsRequest, postMessageRequest } from "../api/contacts";
import io from "socket.io-client";

export const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp debe estar dentro del proveedor TaskContext");
  }
  return context;
};
// const socket = io("http://localhost:3000");
export const AppProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState();

  const prueba = contacts.sort((a, b) => {
    const timestampA = new Date(a.messages[0].timestamp * 1000);
    const timestampB = new Date(b.messages[0].timestamp * 1000);
    return timestampB - timestampA;
  });

  // useEffect(() => {
  //   // Establecer conexión WebSocket
  //   const socket = io();

  //   // Escuchar eventos de mensajes del servidor
  //   socket.on("mensaje", (data) => {
  //     // Actualizar el estado con el nuevo mensaje
  //     setMessages([...messages, data]);
  //   });

  //   // Limpiar la conexión al desmontar el componente
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [messages]);
  // console.log(isConected);

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

  // useEffect(() => {
  //   // Establecer conexión WebSocket
  //   const socket = io();

  //   // Escuchar eventos de mensajes del servidor
  //   socket.on("mensaje", (data) => {
  //     // Actualizar el estado con el nuevo mensaje
  //     setContacts([...contacts, data]);
  //   });

  //   // Limpiar la conexión al desmontar el componente
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [contacts]);
  return (
    <AppContext.Provider value={{ contacts, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node,
};
