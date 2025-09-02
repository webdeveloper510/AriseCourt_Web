import React from "react";

const Footer = () => {
    const current_year = new Date().getFullYear();
  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-md-6">
          <div>
            <ul className="footer_list">
              <li>Privacy Policy</li>
              <li>Terms & Conditions </li>
              <li>Support</li>
            </ul>
          </div>
        </div>
        <div className="col-md-6 copyright_section">
            <p>© Copyright {current_year}, All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
