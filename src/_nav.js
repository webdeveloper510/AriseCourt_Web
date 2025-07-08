import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilFile,
  cilList,
  cilLocationPin,
  cilSpeech,
  cilSpeedometer,
  cilUser,
} from "@coreui/icons";
import { CNavItem } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Reporting",
    to: "/reporting",
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
    permissionId: 3, // Court Bookings Tab only (id = 2)
  },
  {
    component: CNavItem,
    name: "Admins",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    permissionId: 0, // Full Access (id = 0)
  },
  {
    component: CNavItem,
    name: "Users",
    to: "/users",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    permissionId: 0, // Full Access (id = 0)
  },
  {
    component: CNavItem,
    name: "Locations",
    to: "/locations",
    icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Location",
    to: "/location",
    icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
    permissionId: 1, // Location Tab only (id = 1)
  },

  {
    component: CNavItem,
    name: "Court Booking",
    to: "/court-bookings",
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    permissionId: 2, // Reporting Only (id = 3)
  },

  {
    component: CNavItem,
    name: "Messages",
    to: "/messages",
    icon: <CIcon icon={cilSpeech} customClassName="nav-icon" />,
    permissionId: 0, // Full Access (id = 0)
  },
];

export default _nav;
