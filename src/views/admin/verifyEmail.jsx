import { CButton, CModal, CModalBody, CRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyEmail } from "../../utils/api";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
 const [status, setStatus] = useState(null);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const uuid = query.get("uuid");

    useEffect(() => {
      checkVerifyEmail();
    }, []);
  
    const checkVerifyEmail = () => {
      verifyEmail(uuid)
        .then((res) => {
          if (res?.status === 200) {
            setStatus("success");
          } else {
            setStatus("failed");
            // navigate("/")
          }
        })
        .catch((error) => {
          setStatus("failed");
          console.error(error);
        });
    };

  return (
    <>
      <div className=" min-vh-100 d-flex flex-row align-items-center login_outer">
        <CRow className="justify-content-center" style={{ width: "100%" }}>
          <CModal
            alignment="center"
            visible={visible}
            onClose={() => {setVisible(true)
              navigate("/")
            }}
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
                <h2 className="title success mt-4">
                  Email verified successfully! 🎉
                </h2>
                <h4 className="message">You can now log in.</h4>

                <div className="d-flex gap-2 mt-4 justify-content-center">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="btn success"
                  >
                    Login
                  </button>
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
