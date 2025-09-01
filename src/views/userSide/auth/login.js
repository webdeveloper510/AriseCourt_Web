import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/UserLayout";
import LoginPage from "./loginPage";
import RegisterPage from "./registerPage";
import { getAllLocations } from "../../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();
  const [locationName, setLocationName] = useState("");
  const [locationId, setLocationId] = useState("");
  const [loginPage, setLoginPage] = useState(false);
  const [registerPage, setRegisterPage] = useState(false);
  const [allLocation, setAllLocation] = useState([]);
  const [filteredLocation, setFilteredLocation] = useState([]);
  const state = useLocation();

  const location = localStorage.getItem("selectedLocation");
  const locationID = localStorage.getItem("selectedLocationId");

  useEffect(() => {
    if (state) {
      setLocationName(state?.state?.locationName);
      setLocationId(state?.state?.locationId);
    } else if (location) {
      setLocationName(location);
      setLocationId(locationID);
    }
  }, []);

  useEffect(() => {
    getAllLocationData();
  }, []);

  const getAllLocationData = () => {
    getAllLocations()
      .then((res) => {
        if (res?.status == 200) {
          setAllLocation(res?.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBackLocation = () => {
    navigate("/user-select-location");
  };

  return (
    <UserLayout>
      <div
        className="book_court_section"
        style={{
          height: filteredLocation?.length > 2 || loginPage ? "auto" : "450px",
        }}
      >
        <div className="container text-center">
          {registerPage ? (
            <RegisterPage
              locationName={locationName}
              locationId={locationId}
              setRegisterPage={setRegisterPage}
              handleBackLocation={handleBackLocation}
            />
          ) : (
            <LoginPage
              locationName={locationName}
              locationId={locationId}
              setRegisterPage={setRegisterPage}
              handleBackLocation={handleBackLocation}
            />
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default UserLogin;
