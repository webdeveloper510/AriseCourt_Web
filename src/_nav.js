import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilFile,
  cilLocationPin,
  cilSpeedometer,
  cilUser,
} from "@coreui/icons";
import { CNavItem } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Admin",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Locations",
    to: "/locations",
    icon: <CIcon icon={cilLocationPin} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Reporting",
    to: "/reporting",
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Price Configuration',
  //   to: '/price-configuration',
  //   icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: "Court Booking",
    to: "/court-bookings",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
];

export default _nav;
