import api from "./axios";

//LOGIN
export const login = async (data:{email:string; password:string}) => {
  try {
    const res = await api.post("/auth/login", data)
    return res.data
  } catch (error) {
    console.log("Error login:", error)
    throw error
  }
}
//REGISTER
export const register = async (data: {
  name:string;
  email:string;
  password:string;
}) => {
  try {
    const res = await api.post("/auth/register", data)
    return res.data
  } catch (error) {
    console.log("Error Signing Up:", error)
    throw error
  }
}

