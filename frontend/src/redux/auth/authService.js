//service files talks with backend no other should be tal with backend

import api from "../../features/transactions/pages/axiosInstance";

export const loginUserService = async (credentials) => {
  try {
    const res = await api.post("/auth/login", credentials);
    return res.data;
  } catch (error) {
    console.log("erorr from authSlice", error);
    if (error.response && error.response.data) {
      throw error.response.data.message;
    }
    throw "Network Error";
  }
};

export const    registerUserSevice = async (credentials) => {
    // console.log("account name is ",credentials.accountName);
  try {
    const res = await api.post("/auth/signup", {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      accountName: credentials.accountName,
      accountNumber: credentials.accountNumber,
    });
    return res.data;
  } catch (error) {
    console.log("error while registering is ", error);
    if (error.response.data && error.response) {
      throw error.response.data.message;
    }
    throw "Network Error";
  }
};
