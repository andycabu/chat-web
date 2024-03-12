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

export const getContactsRequestById = async (id) =>
  await axios.get(`${URL}messages/${id}/ById`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

export const getMessageUnread = async () =>
  await axios.get(`${URL}messages/unread-count`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
export const postMessagesRead = async (id) =>
  await axios.post(`${URL}messages/read`, id, {
    headers: {
      "Content-Type": "application/json",
    },
  });
