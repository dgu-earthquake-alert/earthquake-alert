import React from "react";
import "../styles/App.css";
import "../styles/Sidebar.css";

const Header = ({ isOpen }) => {
  return (
    <header style={{ color: "white" }}>
      {/* <div className="img">
        <div className="title">지진알리미</div>
      </div> */}
      <nav className={`nav ${isOpen ? "open" : ""}`}>
        <ul className="nav_list">
          <li className="nav_item nav_title">지진알리미</li>
          <li className="nav_item">지진대피소 조회</li>
          <li className="nav_item">지진발생이력</li>
          <li className="nav_item">행동요령</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
