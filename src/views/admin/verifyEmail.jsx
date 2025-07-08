import { CButton, CModal, CModalBody, CRow } from "@coreui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  return (
    <>
      <div className=" min-vh-100 d-flex flex-row align-items-center login_outer">
        <CRow className="justify-content-center" style={{ width: "100%" }}>
          <CModal
            alignment="center"
            visible={visible}
            onClose={() => setVisible(true)}
            aria-labelledby="LiveDemoExampleLabel"
          >
            <CModalBody className="modal_body_court">
              <div className="add_court_modal text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="50"
                  height="50"
                  fill="currentColor"
                  className="bi bi-check-circle-fill"
                  viewBox="0 0 16 16"
                  style={{ color: "#0860fb" }}
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </svg>
                <h1 className="card-title mt-4">
                  Email verified successfully!
                </h1>
                <h4 className="card-title-cancel">You can now log in.</h4>

                <div className="d-flex gap-2 mt-4 justify-content-center">
                  {/* <CButton
                    type="button"
                    onClick={() => navigate("/login")}
                    className="delet_yes"
                  >
                    Login
                  </CButton> */}
                </div>
              </div>
            </CModalBody>
          </CModal>
        </CRow>
      </div>
    </>
  );
};

export default VerifyEmail;
