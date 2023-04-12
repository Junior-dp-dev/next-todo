import axios from "axios";

export const handleDelete = async (item) => {
  try {
    await axios.delete(`${process.env.API_URL}/delete/${item.id}`);
    console.log("Todo deletado com sucesso!");
  } catch (error) {
    console.error(error);
  }
};
