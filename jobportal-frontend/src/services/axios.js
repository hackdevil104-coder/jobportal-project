import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://16.176.4.16:9090",
});

export default axiosInstance;
