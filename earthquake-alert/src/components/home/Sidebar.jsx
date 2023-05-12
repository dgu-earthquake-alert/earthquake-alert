import { useState } from "react";
import styles from "../../styles/home/sidebar.module.css";

const Sidebar = ({ isSidebarOpen, toggleSidebar, location, getMyLocation }) => {
  const [isRotated, setIsRotated] = useState(false); // 새로고침버튼 회전
  let shelterNumber = 1; // css position 계산용
  const top = 64 + 70 * shelterNumber; // css position 계산용

  const refresh = () => {
    setIsRotated(true);
    getMyLocation();
    setTimeout(() => {
      setIsRotated(false);
    }, 500);
  };

  return (
    <>
      <button
        className={`${styles.bookmark_button} ${
          isSidebarOpen ? styles.open : ""
        }`}
        onClick={toggleSidebar}
      >
        ⭐
      </button>

      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div
          className={`${styles.bookmark_refresh} ${
            isRotated ? styles.rotate : ""
          }`}
          onClick={refresh}
        ></div>
        <div className={styles.bookmark_add}></div>
        <div className={styles.bookmark_remove}></div>

        <div>
          <div className={styles.my_location}>
            <span className={styles.my_location_title}>현재 위치</span>
            {location}
          </div>
          {/*           <div className={styles.my_location_item} style={{ top: `${top}px` }}>
            대피소 {shelterNumber++}
          </div>
          <div className={styles.my_location_item} style={{ top: `${top}px` }}>
            대피소 {shelterNumber++}
          </div>
          <div className={styles.my_location_item} style={{ top: `${top}px` }}>
            대피소 {shelterNumber++}
          </div> */}

          <div className={styles.sticky_note}></div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
