import React from "react";
import "../styles/App.css"

const Header = () => {
  return (
    <header style={{ color: "white" }}>
      <div className="img">
        <div className="title">지진알리미</div>
      </div>
      <nav className="nav">
        <ul className="nav_list">
          <li className="nav_item nav_item_select">홈</li>
          <li className="nav_item">지진대피소 조회</li>
          <li className="nav_item">지진발생 이력</li>
          <li className="nav_item">행동요령</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;