import React from "react";
import HomeNavbar from "../HomeNavbar";

const UserLayout = ({ children }) => {
  return (
    <>
      <div>
        <HomeNavbar />
        <div className="mt-1">{children}</div>
      </div>
    </>
  );
};

export default UserLayout;
