import axiosInstance from "../../util/axiosInstance";

export const getSearchDropdown = async ({
  type,
  value,
  searchtext,
  param1,
  param2,
  param3,
  param4,
}) => {
  try {
    const response = await axiosInstance.get("/searchdropdown/search", {
      params: {
        type,
        value,
        searchtext,
        param1,
        param2,
        param3,
        param4,
      },
    });
    return response.data;
  } catch (error) {
    console.error("error", error);
    return [];
  }
};
