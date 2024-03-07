import axios from "axios";
import { URL_WHAT, ACCESS_TOKEN } from "../utils/constants";

export const addMessageRequest = async (data) =>
  await axios.post(URL_WHAT, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
