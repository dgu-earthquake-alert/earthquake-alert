import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/header.module.css";
/* import Login from "./login/Login";
import Profile from "./login/Profile";
 */
import menu from "../assets/icon/menu.svg";
import { PC, Mobile } from "../utils/MediaQuery";

const Header = ({ isSidebarOpen, toggleHeader }) => {
  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    setSelectedItem(location.pathname);
  }, [location]);

  return (
    <>
      <PC>
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
            지진발생이력
          </Link>
          <Link
            to="/rule"
            className={`${styles.nav_item} ${
              selectedItem === "/rule" ||
              selectedItem === "/rule/subpage1" ||
              selectedItem === "/rule/subpage2"
                ? styles.nav_item_select
                : ""
            }`}
          >
            행동요령
          </Link>
          {/*       <div className={`${styles.nav_login}`}>
        {isLogin ? (
          <Profile userInfo={userInfo} />
        ) : (
          <Login setUserInfo={setUserInfo} setIsLogin={setIsLogin} />
        )}
      </div> */}
        </nav>
      </PC>
      <Mobile>
        <nav className={`${styles.nav} ${isSidebarOpen ? styles.open : ""}`}>
          <Link to="/" className={styles.nav_title}>
            지진알리미
          </Link>
          <div className={styles.nav_toggle} onClick={toggleHeader}>
            <img
              src={menu}
              alt="menu"
              width="35px"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            />
          </div>
          <Link
            to="/shelter"
            style={{ display: isMenuOpen ? "flex" : "none" }}
            className={`${styles.nav_item}`}
          >
            지진대피소 조회
          </Link>
          <Link
            to="/record"
            style={{ display: isMenuOpen ? "flex" : "none" }}
            className={`${styles.nav_item}`}
          >
            지진발생이력
          </Link>
          <Link
            to="/rule"
            style={{ display: isMenuOpen ? "flex" : "none" }}
            className={`${styles.nav_item}`}
          >
            행동요령
          </Link>
          {/*       <div className={`${styles.nav_login}`}>
        {isLogin ? (
          <Profile userInfo={userInfo} />
        ) : (
          <Login setUserInfo={setUserInfo} setIsLogin={setIsLogin} />
        )}
      </div> */}
        </nav>
      </Mobile>
    </>
  );
};

export default Header;
