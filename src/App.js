// App.js
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useColorModes } from '@coreui/react';
import './scss/style.scss';
import './scss/examples.scss';
import ForgotEmail from './views/pages/forgotpassword/forgotemail';
import NewPassword from './views/pages/forgotpassword/new-password';
import { PrivateRoute, PublicRoute } from './utils/RouteGuards';
import VerifyEmail from './views/admin/verifyEmail';
import { getProfile } from './utils/api';

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const App = () => {
  const { setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    setColorMode('white');
  }, []);

   useEffect(() => {
      getProfileData();
    }, []);
  
    const getProfileData = () => {
      getProfile()
        .then((res) => {
          if (res?.data.code == "200") {          
          } else if (res?.data?.code == "token_not_valid") {            
            localStorage.removeItem("user_access_valid_token");
            localStorage.removeItem("logged_user_data");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Auth Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotEmail />
            </PublicRoute>
          }
        />
        <Route
          path="/new-password"
          element={
            <PublicRoute>
              <NewPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-email/:id"
          element={
            // <PublicRoute>
              <VerifyEmail />
            // </PublicRoute>
          }
        />

        {/* Error Pages - can be accessed by anyone */}
        <Route path="/404" element={<Page404 />} />
        <Route path="/500" element={<Page500 />} />

        {/* Private Routes (App) */}
        <Route
          path="*"
          element={
            <PrivateRoute>
              <DefaultLayout />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
