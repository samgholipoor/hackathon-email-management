import axiosInstance from "./service.js";

export const sendEmail = async (body) => {
  const response = await axiosInstance.post("/products", body);
  return response.data;
};
