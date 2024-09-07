import axios from "axios";

const axiosInstance = axios.create({

  baseURL: "http://haye-backend.onrender.com/",

  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
