import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/App.css";
import "../styles/Sidebar.css";

const Header = ({ isOpen }) => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location]);

  return (
    <header style={{ color: "white" }}>
      {/* <div className="img">
        <div className="title">지진알리미</div>
      </div> */}
      <nav className={`nav ${isOpen ? "open" : ""}`}>
        <ul className="nav_list">
          <Link to="/">
            <li className="nav_item nav_title">지진알리미</li>
          </Link>
          <Link to="/shelter">
            <li
              className={`nav_item${
                selectedItem === "/shelter" ? " nav_item_select" : ""
              }`}
            >
              지진대피소 조회
            </li>
          </Link>
          <Link to="/record">
            <li
              className={`nav_item${
                selectedItem === "/record" ? " nav_item_select" : ""
              }`}
            >
              지진발생 이력
            </li>
          </Link>
          <li className="nav_item">행동요령</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
