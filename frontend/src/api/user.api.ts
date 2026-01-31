import api from "./axios";

export const upgrade = async (id: number, membership_type: "A" | "B" | "C") => {
  try {
    const res = await api.put(`/users/${id}`, { membership_type });
    return res.data;
  } catch (error) {
    console.log("Error Changing Membership:", error);
    throw error;
  }
};