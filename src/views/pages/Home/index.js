import React from "react";
import BannerImage from "src/assets/images/banner-image.png";
import UserLayout from "../../../components/UserLayout/index.js";
import { Link } from "react-router-dom";

const HomePage = () => {
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
               <Link to="/user-contact-us"> <button className="book_court_btn">Contact Us</button></Link>
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
        </div>
      </div>
    </UserLayout>
  );
};

export default HomePage;
