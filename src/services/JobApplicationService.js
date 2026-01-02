import axiosInstance from "./axios";

const JobApplicationService = {
  apply: async (data) => {
    console.log("📤 Applying job with data:", data);
    const response = await axiosInstance.post("/application/apply", data);
    return response.data;
  },
};

export default JobApplicationService;
