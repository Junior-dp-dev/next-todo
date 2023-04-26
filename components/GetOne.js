import axios from "axios";
import { getToken } from "../utils/auth";

export const GetOne = async function (noteId) {
  try {
    const token = getToken();
    const response = await axios.get(`${process.env.API_URL}/api/note/${noteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
