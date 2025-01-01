import axiosInstance from "./service.js";

export const getProducts = async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
};
