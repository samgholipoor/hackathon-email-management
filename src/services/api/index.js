import axiosInstance from "./service.js";

export const sendEmail = async (body) => {
  const response = await axiosInstance.post("/core/send-email/", body);
  return response.data;
};
