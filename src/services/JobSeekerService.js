import axiosInstance from "./axios";

// Job Seeker-related API calls
const JobSeekerService = {
  signup: async (data) => {
    const response = await axiosInstance.post("/jobseeker/signup", data);
    return response.data;
  },

  login: async (data) => {
    const response = await axiosInstance.post("/jobseeker/login", data);
    return response.data;
  },
};

export default JobSeekerService;
