import axiosInstance from "./axios";

const JobService = {
  postJob: async (data) => {
    return (await axiosInstance.post("/job/post", data)).data;
  },

  getAllJobs: async () => {
    return (await axiosInstance.get("/job/list")).data;
  },

  searchJobs: async (searchText) => {
    return (await axiosInstance.get(`/job/search?title=${searchText}`)).data;
  },
};

export default JobService;

