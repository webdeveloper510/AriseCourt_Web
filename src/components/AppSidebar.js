import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from "@coreui/react";
import { AppSidebarNav } from "./AppSidebarNav";
import logo from "src/assets/images/arise_court.png";
import sygnet from "src/assets/images/logo.png";
import navigation from "../_nav";
import { useNavigate } from "react-router-dom";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const [userPermissions, setUserPermissions] = useState([]);
  const [hasFullAccess, setHasFullAccess] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("logged_user_data"));
    setUserData(data);

    if (data) {
      if (data.access_flag === "0" || data.user_type === 0) {
        setHasFullAccess(true);
      } else {
        const permissions = data.access_flag
          ? data.access_flag.split(",").map(Number)
          : [];
        setUserPermissions(permissions);
      }
    }
  }, []);

  const filteredNavigation = navigation.filter((item) => {
    // Always show Profile
    if (item.name === "Users") return true;

    // If user_type !== 0 → hide Admin and Message
    if (
      userData?.user_type === 1 &&
      (item.name === "Admins" || item.name === "Messages" || item.name === "Locations")
    ) {
      return false;
    }

    if (
      userData?.user_type === 0 &&
      (item.name === "Manage Courts")
    ) {
      return false;
    }

    // If user has full access → show everything else
    if (hasFullAccess) return true;

    // Otherwise, show items only if permissionId matches
    return userPermissions.includes(item.permissionId);
  });

  const handleLogOut = () => {
    localStorage.removeItem("logged_user_data");
    localStorage.removeItem("user_access_valid_token");
    navigate("/login");
  };

  return (
    <CSidebar
      className="p-2 sidebar_outer"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      <CSidebarHeader>
        <CSidebarBrand to="/">
          <img src={logo} alt="logo" className="sidebar-brand-full" />
          <img src={sygnet} alt="logo" className="sidebar-brand-narrow" />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: "set", sidebarShow: false })}
        />
      </CSidebarHeader>

      {/* Pass the filtered navigation items */}
      <AppSidebarNav items={filteredNavigation} />

      <CSidebarFooter
        className="d-none d-lg-flex"
        onClick={() => handleLogOut()}
      >
        <CSidebarToggler />
        <span>Logout</span>
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
