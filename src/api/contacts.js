import axios from "axios";
import { URL } from "../utils/constants";

export const getContactsRequest = async () =>
  await axios.get(`${URL}getContacts`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
