import React from "react";
import "../styles/App.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="footer_item">
          <span className="footer_item_title">지진알리미</span>
          <br />
          &copy; 2023
        </div>
        <div className="footer_item"></div>
        <div className="footer_item"></div>
        <div className="footer_item"></div>
      </div>
    </footer>
  );
};

export default Footer;