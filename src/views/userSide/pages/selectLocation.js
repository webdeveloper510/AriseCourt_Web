import React, { useEffect, useState } from "react";
import UserLayout from "../../../components/UserLayout";
import { getAllLocations } from "../../../utils/api";
import { CCol, CRow } from "@coreui/react";
import { useNavigate } from "react-router-dom";

const SelectLocation = () => {
  const navigate = useNavigate();
  const [locationName, setLocationName] = useState("");
  const [locationId, setLocationId] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [allLocation, setAllLocation] = useState([]);
  const [filteredLocation, setFilteredLocation] = useState([]);

  const location = localStorage.getItem("selectedLocation");
  useEffect(() => {
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
      navigate("/book-court");
      localStorage.setItem("selectedLocation", locationName);
      localStorage.setItem("selectedLocationId", locationId);
    }
  };

  const handleSearchLocation = (e) => {
    e.preventDefault();
    if (searchLocation?.length > 2) {
      setLocationName("");
      const filterData = allLocation?.filter((item) =>
        item?.name?.toLowerCase().includes(searchLocation?.toLowerCase())
      );

      setFilteredLocation(filterData);
    } else {
      setFilteredLocation([]);
    }
  };

  return (
    <UserLayout>
      <div
        className="book_court_section"
        style={{
          height: filteredLocation?.length > 2 ? "auto" : "450px",
        }}
      >
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
                  autoComplete="off"
                  onChange={(e) => {
                    setSearchLocation(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchLocation(e);
                    }
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
                Enter at least 3 characters
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
                    className={`locations_name_section ${locationName == item?.name ? "selected_name" : ""} ${i % 2 == 0 ? "even_bg" : "odd_bg"}`}
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
      </div>
    </UserLayout>
  );
};

export default SelectLocation;
