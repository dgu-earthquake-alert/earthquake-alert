import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/header.module.css";
import Login from "./login/Login";
import Profile from "./login/Profile";

const Header = ({ isSidebarOpen, toggleHeader }) => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location]);

  return (
    <nav className={`${styles.nav} ${isSidebarOpen ? styles.open : ""}`}>
      <Link to="/" className={styles.nav_title}>
        지진알리미
      </Link>
      <Link
        to="/shelter"
        className={`${styles.nav_item} ${
          selectedItem === "/shelter" ? styles.nav_item_select : ""
        }`}
      >
        지진대피소 조회
      </Link>
      <Link
        to="/record"
        className={`${styles.nav_item} ${
          selectedItem === "/record" ? styles.nav_item_select : ""
        }`}
      >
        지진발생 이력
      </Link>
      <Link to="/rule" className={`${styles.nav_item} ${
          selectedItem === "/rule" || selectedItem === "/rule/subpage1" || selectedItem === "/rule/subpage2" ? styles.nav_item_select : ""
        }`}>
        행동요령
      </Link>
      <div className={`${styles.nav_login}`}>
        {isLogin ? (
          <Profile userInfo={userInfo} />
        ) : (
          <Login setUserInfo={setUserInfo} setIsLogin={setIsLogin} />
        )}
      </div>
    </nav>
  );
};

export default Header;
