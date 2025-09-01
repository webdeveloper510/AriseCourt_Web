import React from "react";
import UserLayout from "../../../components/UserLayout";
import BannerImage from "src/assets/images/how-it-works-banner.jpeg";

const HowItWorks = () => {
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
    <>
      <UserLayout>
        <div className="mt-5">
          <div className="row container m-auto">
            <div className="col-md-6 d-flex align-items-center">
              <div>
                <h1 className="banner_title">Arise Court Booking System</h1>
                <p>Available on App Store and Google Play Store</p>
              </div>
            </div>
            <div className="col-md-6 text-center">
              <img
                src={BannerImage}
                alt="BannerImage"
                style={{ width: "70%" }}
              />
            </div>
          </div>

          <div className="container my-5 px-4">
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
      </UserLayout>
    </>
  );
};

export default HowItWorks;
