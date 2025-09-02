import React, { useEffect, useRef, useState } from "react";
import logo from "src/assets/images/login_logo.png";
import UserImage from "src/assets/images/user_image.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "../utils/api";

const HomeNavbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("user_access_valid_token");
  const selectedLocationId = localStorage.getItem("selectedLocationId");
  const userData = JSON.parse(localStorage.getItem("logged_user_data"));
  const role = localStorage.getItem("role");
  const [user, setUser] = useState(null);

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (token) {
      getProfileData();
    }
  }, [token]);

  const getProfileData = () => {
    getProfile()
      .then((res) => {
        if (res?.data.code == "200") {
          setUser(res?.data?.data);
        } else {
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="main_app_heading">
        <p>Not a business? Book on the arisecourt app</p>
      </div>
      <div className="container">
        <Navbar expand="lg" className="bg-body-tertiary p-0 m-0">
          <Container fluid className="px-0">
            <Navbar.Brand href="/">
              <img src={logo} alt="logo" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px", margin: "auto" }}
                navbarScroll
              >
                {token && (
                  <Nav.Link
                    as={Link}
                    to={
                      token && role == "superadmin"
                        ? "/bookings"
                        : role == "user"
                          ? "/user-bookings"
                          : "/user-select-location"
                    }
                    className="header_links"
                  >
                    My Bookings
                  </Nav.Link>
                )}

                {/* <Nav.Link as={Link} to="/how-it-works" className="header_links">
                  How it Works
                </Nav.Link> */}
                {/* <Nav.Link
                  as={Link}
                  to="/user-contact-us"
                  className="header_links"
                >
                  Contact us
                </Nav.Link> */}
              </Nav>
              <div className="d-flex">
                {token ? (
                  <>
                    {" "}
                    <Link
                      to={
                        role == "user"
                          ? "/user-book-court"
                          : userData?.user_type == 0 && !selectedLocationId
                            ? "/select-location"
                            : "/book-court"
                      }
                      className="links_url"
                    >
                      <button className="book_court_btn mx-1">
                        Book a Court
                      </button>
                    </Link>
                    <div className="user-menu" ref={menuRef}>
                      {/* User Button */}
                      <button
                        className="user_name_btn"
                        onClick={() => setOpen(!open)}
                      >
                        <img
                          src={
                            user?.image
                              ? `https://api.get1court.com/${user?.image}`
                              : UserImage
                          }
                          width={30}
                          height={30}
                          className="user-avatar"
                          alt="User"
                        />
                        <span>
                          {`${userData?.first_name ? userData?.first_name : ""} ${
                            userData?.last_name ? userData?.last_name : ""
                          }`}
                        </span>
                      </button>

                      {/* Dropdown Menu */}
                      {open && (
                        <div className="user_dropdown">
                          <ul>
                            {role == "superadmin" && (
                              <li onClick={() => navigate("/reporting")}>
                                <i className="bi bi-card-list me-1"></i>{" "}
                                Dashboard
                              </li>
                            )}

                            <li
                              onClick={() =>
                                navigate(
                                  `${role == "user" ? "/user-profile" : "/profile"}`
                                )
                              }
                            >
                              <i className="bi bi-person-fill me-1"></i> Profile
                            </li>
                            <li onClick={() => handleLogout()}>
                              <i className="bi bi-box-arrow-right me-1"></i>{" "}
                              Logout
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="d-flex">
                    <Link to="/user-select-location" className="links_url">
                      <button className="book_court_btn mx-1">
                        Book a Court
                      </button>
                    </Link>

                    <Link to="/login" className="links_url">
                      {" "}
                      <button className="user_name_btn1">Staff Sign In</button>
                    </Link>
                  </div>
                )}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default HomeNavbar;
