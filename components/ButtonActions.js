import axiosInstance from "./axiosInstance ";

export const handleDelete = async (item, setDeleted) => {
  try {
    await axiosInstance.delete(`notes/delete/${item.id}/`);
    setDeleted(!deleted);
  } catch (error) {
    console.error(error);
  }
};

export const handleFinish = async (item) => {
  try {
    const updatedItem = { ...item, finished: false };
    await axiosInstance.put(`notes/update/${item.id}/`, updatedItem);
  } catch (error) {
    console.error(error);
  }
};
