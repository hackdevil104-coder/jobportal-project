 import axiosInstance from "./axios";

const EmployerService = {
  signup: async (data) => {
    const response = await axiosInstance.post("/employer/signup", data);
    return response.data;
  },

  login: async (data) => {
    const response = await axiosInstance.post("/employer/login", data);
    return response.data;
  },
};

export default EmployerService;
