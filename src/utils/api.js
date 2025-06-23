import axios from "axios";

axios.defaults.baseURL = "http://3.12.136.26:8000";

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

export const forgotEmail = async (data) => {
  try {
    const response = await axios.post("/send-reset-email/", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const verifyOtp = async (data) => {
  try {
    const response = await axios.post("/verify-otp/", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const resendOtp = async (data) => {
  try {
    const response = await axios.post("/resend-otp/", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const resetNewPassword = async (data) => {
  try {
    const response = await axios.post("/reset-password/", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const addLocation = async (data) => {
  try {
    const response = await axios.post("/locations/", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getLocation = async (page, search, startDate, endDate) => {
  const searchVal = search ? `&search=${search}` : "";
  const start_date = startDate
    ? `&start_date=${startDate}&end_date=${endDate}`
    : "";
  try {
    const response = await axios.get(
      `/locations/?page=${page}${searchVal}${start_date}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateLocation = async (id, data) => {
  try {
    const response = await axios.put(`/locations/${id}/`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
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
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
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
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
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
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getCourts = async (id, page) => {
  try {
    const response = await axios.get(`/courts/${id}/?page=${page}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
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
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
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
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
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
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getAdmin = async (page, search, startDate, endDate) => {
  const searchVal = search ? `&search=${search}` : "";
  const start_date = startDate
    ? `&start_date=${startDate}&end_date=${endDate}`
    : "";
  try {
    const response = await axios.get(
      `/create_admin/?page=${page}${searchVal}${start_date}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const addAdmintData = async (data) => {
  try {
    const response = await axios.post("/create_admin/", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
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
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
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
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
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
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getCourtBooking = async (type,page,search,startDate, endDate) => {
const bookingType = type ? type : ""
const searchVal = search ? `&search=${search}` : "";
const start_date = startDate ? `&start_date=${startDate}&end_date=${endDate}` : ""

  try {
    const response = await axios.get(
      `/court-bookings/?type=${bookingType}&page=${page}${searchVal}${start_date}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getCourtBookingbyId = async (id) => {
  try {
    const response = await axios.get(`/court-bookings/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getReportBooking = async (type,page,search,startDate, endDate) => {
  const bookingType = type ? type : ""
  const searchVal = search ? `&search=${search}` : "";
  const start_date = startDate ? `&start_date=${startDate}&end_date=${endDate}` : ""
  
    try {
      const response = await axios.get(
        `/user-data/?user_type=${bookingType}&page=${page}${searchVal}${start_date}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
          },
        }
      );
      return response;
    } catch (error) {
      return error.response;
    }
  };

export const getReportData = async () => {
  try {
    const response = await axios.get(`/reporting-data/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getProfile = async () => {
  try {
    const response = await axios.get(`/profile/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateProfile = async (data) => {
  try {
    const response = await axios.put(`/profile/`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getContactMessage = async () => {
  try {
    const response = await axios.get(`/contact-us/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("user_access_valid_token")}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};