import api from "./axios";

//GET CONTENT SEARCH
export const getContent = async (search: string = "") => {
  try {
    const res = await api.get(`/contents?search=${search}`);
    return res.data;
  } catch (error) {
    console.log("Error fetching content:", error);
    throw error;
  }
};

//GET CONTENT DETAILS
export const getContentDetails = async (id: number) => {
  try {
    const res = await api.get(`/contents/${id}`);
    return res.data;
  } catch (error) {
    console.log("Error fetching content details:", error);
    throw error;
  }
};
