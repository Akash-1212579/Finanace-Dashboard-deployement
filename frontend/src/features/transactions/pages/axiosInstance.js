import axios from "axios";

const api = axios.create({
  baseURL: "https://finanace-dashboard-deployement.onrender.com/",  //backend api
});

// Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    if(error.response?.status ==401)
    {console.log(error);
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error)}
);

export default api;
