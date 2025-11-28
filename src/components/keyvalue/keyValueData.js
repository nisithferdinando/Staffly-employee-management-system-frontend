import axiosInstance from "../../util/axiosInstance";

export const getKeyValue = async (keyValue) => {
  try {
    const response = await axiosInstance.get(`/key/key?key=${keyValue}`);
    return response.data;
  } catch (error) {
    console.error("error", error);
    return [];
  }
};
