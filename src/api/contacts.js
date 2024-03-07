import axios from "axios";
import { URL } from "../utils/constants";

export const getContactsRequest = async () =>
  await axios.get(`${URL}getContacts`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const postMessageRequest = async (data) =>
  await axios.post(`${URL}saveMessage`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
