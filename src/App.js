// App.js
import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { CContainer, useColorModes } from "@coreui/react";
import "./scss/style.scss";
import { useNavigate } from "react-router-dom";
import "./scss/examples.scss";
import ForgotEmail from "./views/pages/forgotpassword/forgotemail";
import NewPassword from "./views/pages/forgotpassword/new-password";
import {
  SuperAdminPrivateRoute,
  SuperAdminPublicRoute,
  UserPrivateRoute,
  UserPublicRoute,
} from "./utils/RouteGuards";
import VerifyEmail from "./views/admin/verifyEmail";
import { getProfile } from "./utils/api";
import PrivacyPolicy from "./views/pages/PrivacyPolicy";
import HomePage from "./views/pages/Home";
import UserLogin from "./views/userSide/auth/login";
import ForgotPassword from "./views/userSide/auth/forgotPassword";
import EnterOtp from "./views/userSide/auth/enterOtp";
import SetNewPassword from "./views/userSide/auth/newPasword";
import BookCourt from "./views/userSide/pages/addBooking";
import MyBooking from "./views/userSide/pages/myBooking";
import routes from "./routes";
import UserProfile from "./views/userSide/pages/userProfile";
import UserBookingDetails from "./views/userSide/pages/userBookingDetails";
import UserContactUs from "./views/userSide/pages/userContactus";
import PaymentSuccess from "./views/userSide/pages/paymentSuccess";
import PaymentCancel from "./views/userSide/pages/paymentCancel";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutPage from "./views/userSide/pages/CheckoutPage";

const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const App = () => {
  const { setColorMode } = useColorModes(
    "coreui-free-react-admin-template-theme"
  );
  const storedTheme = useSelector((state) => state.theme);
  const navigate = useNavigate();

  useEffect(() => {
    setColorMode("white");
  }, []);

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = () => {
    const token = localStorage.getItem("user_access_valid_token");

    if (token) {
      getProfile()
        .then((res) => {
          if (res?.data.code == "200") {
          } else if (res?.data?.code == "token_not_valid") {
            navigate("/");
            localStorage.removeItem("user_access_valid_token");
            localStorage.removeItem("logged_user_data");
          }
        })
        .catch((error) => {
          navigate("/");
          console.log(error);
        });
    }
  };

  const stripePromise = loadStripe(
    "pk_test_51RbEv9IorG3LMbfblOcsWQtpVzPj3Hg6jRwgAeamUV6SqEICC1I0UNgEjWQPazjVmepwgHsTyulBboKdvChRnwMK00qgdQCFE2"
  );
  return (
    <>
      <Elements stripe={stripePromise}>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={
              <SuperAdminPublicRoute>
                <Login />
              </SuperAdminPublicRoute>
            }
          />
          <Route
            path="/user/login"
            element={
              <UserPublicRoute>
                <UserLogin />
              </UserPublicRoute>
            }
          />
          <Route
            path="/user/otp"
            element={
              <UserPublicRoute>
                <EnterOtp />
              </UserPublicRoute>
            }
          />
          <Route
            path="/user/new-password"
            element={
              <UserPublicRoute>
                <SetNewPassword />
              </UserPublicRoute>
            }
          />
          <Route
            path="/user/book-court"
            element={
              <UserPrivateRoute>
                <BookCourt />
              </UserPrivateRoute>
            }
          />
          <Route
            path="/user/bookings"
            element={
              <UserPrivateRoute>
                <MyBooking />
              </UserPrivateRoute>
            }
          />
          <Route
            path="/user/booking-details/:id"
            element={
              <UserPrivateRoute>
                <UserBookingDetails />
              </UserPrivateRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <UserPrivateRoute>
                <UserProfile />
              </UserPrivateRoute>
            }
          />

          <Route path="/user/contact-us" element={<UserContactUs />} />
          {/* /payment/success */}

          <Route
            path="/payment/success"
            element={
              // <UserPrivateRoute>
                <PaymentSuccess />
              // </UserPrivateRoute>
            }
          />

          <Route
            path="/checkout-session"
            element={
              <UserPrivateRoute>
                <CheckoutPage />
              </UserPrivateRoute>
            }
          />

          <Route
            path="/payment/cancel"
            element={
              <UserPrivateRoute>
                <PaymentCancel />
              </UserPrivateRoute>
            }
          />

          <Route path="/user/contact-us" element={<UserContactUs />} />
          <Route
            path="/user/forgot-password"
            element={
              <UserPublicRoute>
                <ForgotPassword />
              </UserPublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <SuperAdminPublicRoute>
                <Register />
              </SuperAdminPublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <SuperAdminPublicRoute>
                <ForgotEmail />
              </SuperAdminPublicRoute>
            }
          />
          <Route
            path="/new-password"
            element={
              <SuperAdminPublicRoute>
                <NewPassword />
              </SuperAdminPublicRoute>
            }
          />
          <Route path="/verify-email/:id" element={<VerifyEmail />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* Error Pages - can be accessed by anyone */}
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          {/* Private Routes (App) */}
          <Route
            path="*"
            element={
              <SuperAdminPrivateRoute>
                <DefaultLayout />
              </SuperAdminPrivateRoute>
            }
          />
        </Routes>
      </Elements>
    </>
  );
};

export default App;
