import React from "react";
import BannerImage from "src/assets/images/banner-image.png";
import BannerImage2 from "src/assets/images/how-it-works-banner.jpeg";
import AppSectionImage from "src/assets/images/app_Section.png";
import LoginLogo from "src/assets/images/login_logo.png";
import AppStore from "src/assets/images/app-store.png";
import PlayStore from "src/assets/images/play-store.png";
import UserLayout from "../../../components/UserLayout/index.js";
import { Link } from "react-router-dom";

const HomePage = () => {
  const howToWorks = [
    {
      title: "Register",
      description:
        "Create an account by providing your details. This will allow you to manage your bookings and track your court history.",
      icon: "bi bi-person-square",
    },
    {
      title: "Select Date & Time",
      description:
        "Browse available courts and choose a date and time that fits your schedule. The app shows available slots in real-time to help you book easily.",
      icon: "bi bi-calendar-check",
    },
    {
      title: "Book in Advance",
      description:
        "Secure your spot by booking your court ahead of time. You can reserve courts for future dates, making it easy to plan your sessions.",
      icon: "bi bi-card-list",
    },
    {
      title: "No Cancellations or Refunds",
      description:
        "Please note, all bookings are final. Once a reservation is made, it cannot be canceled or refunded. Be sure of your time before confirming!",
      icon: "bi bi-x-square-fill",
    },
  ];

  return (
    <UserLayout>
      <div className="mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center">
              <div>
                <h1 className="banner_title">
                  Booking a Badminton Court Easier Using The Arise Court
                  Website{" "}
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.{" "}
                </p>
                <Link to="/user-contact-us">
                  {" "}
                  <button className="book_court_btn">Contact Us</button>
                </Link>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <img
                src={BannerImage}
                alt="BannerImage"
                style={{ width: "60%" }}
              />
            </div>
          </div>
          {/* <h4 className="book_court_title">Book Court</h4>
            <MultiStepForm /> */}
          <div className="row mt-5 px-0 ps-0 pe-0 app_store_section" style={{ background: "#D2E3FF", borderRadius:"15px" }}>
            <div className="col-md-6 text-center mx-0 px-0 ps-0 pe-0">
              <img
                src={AppSectionImage}
                alt="BannerImage"
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-md-6 d-flex align-items-center px-5 py-4">
              <div>
                <img src={LoginLogo} alt="BannerImage" className="mb-5" />
                <div className="row">
                  <div className="col-md-6 my-2">
                    <img
                      src={AppStore}
                      alt="BannerImage"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="col-md-6 my-2">
                    <img
                      src={PlayStore}
                      alt="BannerImage"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-5">
            <h1 className="text-center how_work_heading mb-3">How It Works</h1>
            <div className="how_work_section">
              {howToWorks?.map((item, i) => {
                return (
                  <>
                    <div className="row align-items-center my-2">
                      <div className="col-md-2">
                        <i className={`${item?.icon} how_works_icon`}></i>
                      </div>
                      <div className="col-md-2">
                        <h5 className="how_works_step">Step {i + 1}</h5>
                      </div>
                      <div className="col-md-8 how_works_text">
                        <h4>{item?.title}</h4>
                        <p>{item?.description}</p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default HomePage;
