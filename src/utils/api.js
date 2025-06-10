import axios from "axios";

axios.defaults.baseURL =  "http://127.0.0.1:8000";


export const registerUser = async (data) => {
  try {
    const response = await axios.post("/register/", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post("/login/", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

// locations