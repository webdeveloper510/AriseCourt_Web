import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/UserLayout";
import LoginPage from "./loginPage";
import RegisterPage from "./registerPage";
import { getAllLocations } from "../../../utils/api";
import { CCol, CRow } from "@coreui/react";

const UserLogin = () => {
  const [locationName, setLocationName] = useState("");
  const [locationId, setLocationId] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [loginPage, setLoginPage] = useState(false);
  const [registerPage, setRegisterPage] = useState(false);
  const [allLocation, setAllLocation] = useState([]);
  const [filteredLocation, setFilteredLocation] = useState([]);

  const location = localStorage.getItem("selectedLocation");
  useEffect(() => {
    const locationid = localStorage.getItem("selectedLocationId");
    if (location) {
      setLocationName(location);
      setLocationId(locationid);
      setLoginPage(true);
      setSearchLocation(location);
      const filterData = allLocation?.filter((item) =>
        item?.name?.includes(location)
      );
      setFilteredLocation(filterData);
    }

    localStorage.removeItem("selectedLocation");
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

  const handleLocationSelect = (value, id) => {
    setLocationName(value);
    setLocationId(id);
  };

  const handleContinue = () => {
    if (locationName) {
      setLoginPage(true);
      localStorage.setItem("selectedLocation", locationName);
      localStorage.setItem("selectedLocationId", locationId);
    }
  };

  const handleSearchLocation = (e) => {
    e.preventDefault();
    if (searchLocation?.length > 3) {
      setLocationName("");
      const filterData = allLocation?.filter((item) =>
        item?.name?.toLowerCase().includes(searchLocation?.toLowerCase())
      );

      setFilteredLocation(filterData);
    } else {
      setFilteredLocation([]);
    }
  };

  const handleBackLocation = () => {
    setLoginPage(false);
    const locationid = localStorage.getItem("selectedLocationId");
    if (location) {
      setLocationName(location);
      setLocationId(locationid);
      setSearchLocation(location);
      const filterData = allLocation?.filter((item) =>
        item?.name?.includes(location)
      );
      setFilteredLocation(filterData);
    }
  };

  return (
    <UserLayout>
      <div className="book_court_section">
        {!loginPage && (
          <div className="container text-center">
            <h4 className="book_court_title">Search Court</h4>
            <CRow className="d-flex justify-content-center">
              <CCol md={4}>
                <div className="d-flex align-items-center gap-2 justify-content-center">
                  <input
                    type="text"
                    className="search_location_input"
                    placeholder="Search Organization..."
                    name="searchLocation"
                    value={searchLocation}
                    onChange={(e) => {
                      setSearchLocation(e.target.value);
                    }}
                  />
                  <div
                    className="search_icons"
                    onClick={(e) => {
                      handleSearchLocation(e);
                    }}
                  >
                    <i className="bi bi-search"></i>
                  </div>
                </div>
                <span className="letter_validtaion">
                  Enter at least 4 characters
                </span>
              </CCol>
            </CRow>

            <div className="mt-4">
              {filteredLocation?.length > 0 ? (
                filteredLocation?.map((item, i) => {
                  return (
                    <div
                      onClick={() => {
                        handleLocationSelect(item?.name, item?.id);
                      }}
                      className={`locations_name_section ${locationName == item?.name ? "selected_name" : ""}`}
                    >
                      <div className="location_detail_section">
                        <div>
                          <img
                            src={item?.logo}
                            width={50}
                            height={50}
                            style={{ borderRadius: "10px" }}
                          />
                        </div>
                        <div className={`location_details`}>
                          <h6 className="location_name">{item?.name}</h6>
                          <p className="location_address">{`
                      ${item?.address_1 ? item?.address_1 : ""} ${item?.address_2 ? item?.address_2 : ""} ${item?.address_3 ? item?.address_3 : ""} ${item?.address_4 ? item?.address_4 : ""}
                      `}</p>
                        </div>
                      </div>
                      <div>
                        <p className="location_check">
                          {locationName == item?.name ? "✔" : ""}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>

            {filteredLocation?.length > 0 && locationName && (
              <div className="mt-4">
                <button
                  className="continue_butn"
                  onClick={() => handleContinue()}
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        )}

        {loginPage && (
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
        )}
      </div>
    </UserLayout>
  );
};

export default UserLogin;
