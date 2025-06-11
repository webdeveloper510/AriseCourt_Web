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

export const addLocation = async (data) => {
  try {
    const response = await axios.post("/locations/", data, {
      headers: {
        Authorization: `${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getLocation = async () => {
  try {
    const response = await axios.get("/locations/", {
      headers: {
        Authorization: `${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateLocation = async (id, data) => {
  try {
    const response = await axios.put(`/locations/${id}/`, data, {
      headers: {
        Authorization: `${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getLocationbyId = async (id) => {
  try {
    const response = await axios.get(`/locations/${id}/`, {
      headers: {
        Authorization: `${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteLocationbyId = async (id) => {
  try {
    const response = await axios.delete(`/locations/${id}/`, {
      headers: {
        Authorization: `${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const addCourtData = async (data) => {
  try {
    const response = await axios.post("/courts/", data, {
      headers: {
        Authorization: `${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getCourts = async () => {
  try {
    const response = await axios.get("/courts/", {
      headers: {
        Authorization: `${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateCourt = async (id, data) => {
  try {
    const response = await axios.put(`/courts/${id}/`, data, {
      headers: {
        Authorization: `${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getCourtbyId = async (id) => {
  try {
    const response = await axios.get(`/courts/${id}/`, {
      headers: {
        Authorization: `${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteCourtbyId = async (id) => {
  try {
    const response = await axios.delete(`/courts/${id}/`, {
      headers: {
        Authorization: `${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getAdmin = async () => {
  try {
    const response = await axios.get("/create_admin/", {
      headers: {
        Authorization: `${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const addAdmintData = async (data) => {
  try {
    const response = await axios.post("/create_admin/", data, {
      headers: {
        Authorization: `${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateAdmin = async (id, data) => {
  try {
    const response = await axios.put(`/create_admin/${id}/`, data, {
      headers: {
        Authorization: `${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getAdminbyId = async (id) => {
  try {
    const response = await axios.get(`/create_admin/${id}/`, {
      headers: {
        Authorization: `${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteAdminbyId = async (id) => {
  try {
    const response = await axios.delete(`/create_admin/${id}/`, {
      headers: {
        Authorization: `${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};