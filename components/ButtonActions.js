import axios from "axios";
import { getToken } from "../utils/auth";
import { useRouter } from "next/router";

export const handleDelete = async (item, setDeleted) => {
  const router = useRouter();
  try {
    const token = getToken();
    await axios.delete(`${process.env.API_URL}/api/notes/delete/${item.id}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`Nota ${item.id} deletada`);
    setDeleted(!deleted);
    router.push(`/notes/`);
  } catch (error) {
    console.error(error);
  }
};

export const handleFinish = async (item) => {
  const router = useRouter();
  const token = getToken();
  try {
    const updatedItem = { ...item, finished: false };
    const response = await axios.put(`${process.env.API_URL}/api/notes/update/${item.id}/`, updatedItem, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Note updated:", response.data);
    router.push(`/notes/`);
  } catch (error) {
    console.error(error);
  }
};
