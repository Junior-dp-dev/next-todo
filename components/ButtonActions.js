import { useRouter } from "next/router";
import axiosInstance from "./axiosInstance ";

export const handleDelete = async (item, setDeleted) => {
  const router = useRouter();
  try {
    await axiosInstance.delete(`notes/delete/${item.id}/`);
    console.log(`Nota ${item.id} deletada`);
    setDeleted(!deleted);
    router.push(`/notes/`);
  } catch (error) {
    console.error(error);
  }
};

export const handleFinish = async (item) => {
  const router = useRouter();
  try {
    const updatedItem = { ...item, finished: false };
    const response = await axiosInstance.put(`notes/update/${item.id}/`, updatedItem);
    console.log("Note updated:", response.data);
    router.push(`/notes/`);
  } catch (error) {
    console.error(error);
  }
};
