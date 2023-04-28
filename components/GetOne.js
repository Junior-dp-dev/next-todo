import axiosInstance from "./axiosInstance ";

export const GetOne = async function (noteId) {
  try {
    const response = await axiosInstance.get(`note/${noteId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
