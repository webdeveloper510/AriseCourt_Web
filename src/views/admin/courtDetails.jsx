import React, { useEffect, useState } from "react";
import { CCardBody, CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilArrowLeft } from "@coreui/icons";
import { useNavigate, useParams } from "react-router-dom";
import badminton from "../../assets/images/badminton.png";

import { getCourtBookingbyId } from "../../utils/api";
import { toast } from "react-toastify";

const CourtDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [courtData, setCourtData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLocationDatabyId();
  }, [id]);

  const getLocationDatabyId = () => {
    setLoading(true);
    getCourtBookingbyId(id)
      .then((res) => {
        setLoading(false);
        if (res?.status == 200) {
          setFormData(res?.data);
          setCourtData(res?.data?.courts);
        } else if (res?.data?.code == "token_not_valid") {
          toast.error(res?.data?.detail, {
            theme: "colored",
          });
          localStorage.removeItem("user_access_valid_token");
          localStorage.removeItem("logged_user_data");
          navigate("/login");
        } else {
          setFormData(null);
          setCourtData([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setFormData(null);
        setCourtData([]);
      });
  };

  const handleBackNavigate = () => {
    navigate(-1);
  };

  const convertToAmPm = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    const hourNum = parseInt(hours, 10);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const adjustedHour = hourNum % 12 || 12; // Convert 0 to 12
    return `${adjustedHour}:${minutes} ${ampm}`;
  };

  const convertToHoursOnly = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");
    const hourNum = parseInt(hours, 10);
    return `${hourNum} Hour${hourNum !== 1 ? "s" : ""}`;
  };

  return (
    <>
      {loading && (
        <div className="loader_outer">
          <span className="loader"></span>
        </div>
      )}
      <CCardBody className="p-2 position-relative">
        <CRow>
          <CCol sm={12} md={12}>
            <div className="d-flex gap-3 align-items-center">
              <div>
                <span>
                  <CIcon
                    onClick={() => handleBackNavigate()}
                    icon={cilArrowLeft}
                    className="back_icon"
                  ></CIcon>
                </span>{" "}
              </div>
              <div>
                <h4 id="traffic" className="card-title mb-0">
                  Court Details
                </h4>
              </div>
            </div>
          </CCol>
        </CRow>

        <div className="mt-4 location_Details_section">
          <CRow className="align-items-center">
            <CCol sm={12} md={3}>
              <div className="badminton_bg">
                <img
                  src={formData?.logo ? formData?.logo : badminton}
                  alt="logo"
                />
              </div>
            </CCol>
            <CCol sm={12} md={9}>
              <CRow>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Id key</h6>
                  <p className="details_description">{formData?.booking_id}</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Email</h6>
                  <p
                    className="details_description"
                    style={{ textTransform: "lowercase" }}
                  >
                    {formData?.user?.email}
                  </p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Phone</h6>
                  <p className="details_description">{formData?.user?.phone}</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Name</h6>
                  <p className="details_description">{`${formData?.user?.first_name} ${formData?.user?.last_name}`}</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">User Type</h6>
                  <p className="details_description">
                    {formData?.user?.user_type == 1
                      ? "Admin"
                      : formData?.user?.user_type == 3
                        ? "Player"
                        : formData?.user?.user_type == 2
                          ? "Coach"
                          : formData?.user?.user_type == 4
                            ? "Court"
                            : ""}
                  </p>
                </CCol>

                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Amount</h6>
                  <p className="details_description">{formData?.amount}</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">CC Fees</h6>
                  <p className="details_description">{formData?.cc_fees}%</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Court Number</h6>
                  <p className="details_description">
                    {formData?.court?.court_number}
                  </p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Court fees per hours</h6>
                  <p className="details_description">
                    {formData?.court?.court_fee_hrs}
                  </p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Tax</h6>
                  <p className="details_description">{formData?.tax}%</p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Booking Date</h6>
                  <p className="details_description">
                    {formData?.booking_date}
                  </p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Start Time</h6>
                  <p className="details_description">
                    {formData?.start_time
                      ? convertToAmPm(formData?.start_time)
                      : ""}
                  </p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">End Time</h6>
                  <p className="details_description">
                    {formData?.end_time
                      ? convertToAmPm(formData?.end_time)
                      : ""}
                  </p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Duration Time</h6>
                  <p className="details_description">
                    {formData?.duration_time
                      ? convertToHoursOnly(formData?.duration_time)
                      : ""}
                  </p>
                </CCol>
                <CCol sm={12} md={4} className="my-1">
                  <h6 className="detail_title">Payment Status</h6>
                  <p className="details_description">{formData?.status}</p>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </div>

        <div className="address_Section mt-4">
          <CRow>
            <CCol sm={12} md={6}>
              <label className="add_court_label">Address 1</label>
              <p className="address_text">
                {formData?.court?.location?.address_1}
              </p>
            </CCol>
            <CCol sm={12} md={6}>
              <label className="add_court_label">Address 2</label>
              <p className="address_text">
                {formData?.court?.location?.address_2}
              </p>
            </CCol>
            <CCol sm={12} md={6}>
              <label className="add_court_label">Address 3</label>
              <p className="address_text">
                {formData?.court?.location?.address_3}
              </p>
            </CCol>
            <CCol sm={12} md={6}>
              <label className="add_court_label">Address 4</label>
              <p className="address_text">
                {formData?.court?.location?.address_4}
              </p>
            </CCol>
            <CCol sm={12} md={12}>
              <label className="add_court_label">Description</label>
              <p className="address_text">
                {formData?.court?.location?.description}
              </p>
            </CCol>
          </CRow>
        </div>
      </CCardBody>
    </>
  );
};

export default CourtDetails;
