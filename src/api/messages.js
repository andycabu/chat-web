import axios from "axios";
import { URL_WHAT, ACCESS_TOKEN, URL } from "../utils/constants";
export const getMessagesByIdRequest = async (id) => {
  const URLWithParams = `${URL}getMessages/${id}`;

  try {
    const response = await axios.get(URLWithParams, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Error al obtener mensajes del servidor: " + error.message);
  }
};
export const addMessageRequest = async (data) =>
  await axios.post(URL_WHAT, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
export const deleteTaskRequest = (id) => axios.delete(`/message/delete/${id}`);
