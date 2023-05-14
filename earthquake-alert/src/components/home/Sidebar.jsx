import { useEffect, useState, useRef } from "react";
import styles from "../../styles/home/sidebar.module.css";
import { fetchMapPlaceData } from "../../utils/api";

const Sidebar = ({
  isSidebarOpen,
  toggleSidebar,
  lat,
  lng,
  location,
  getMyLocation,
}) => {
  const [isRotated, setIsRotated] = useState(false); // 새로고침버튼 회전
  const [isDisplayed, setIsDisplayed] = useState(true); // 대피소 정보 표시 여부
  const nearbyShelterRef = useRef([]); // 주변 대피소 정보

  let shelterNumber = 1; // css position 계산용
  const top = 64 + 70 * shelterNumber; // css position 계산용

  const refresh = () => {
    setIsRotated(true);
    getMyLocation();
    setTimeout(() => {
      setIsRotated(false);
    }, 500);
  };

  useEffect(() => {
    fetchMapPlaceData().then((data) => {
      const filteredShelter = data.filter((item) => {
        return (
          item.lat > lat - 0.01 &&
          item.lat < lat + 0.01 &&
          item.lng > lng - 0.01 &&
          item.lng < lng + 0.01
        );
      });

      nearbyShelterRef.current = filteredShelter; // Store the value in the useRef

      /* console.log(nearbyShelterRef.current);
      console.log(lat, lng, location); */
    });
  }, [location, lat, lng]);

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

        <div className={styles.my_location_container}>
          <div
            className={styles.my_location}
            onClick={() => setIsDisplayed(!isDisplayed)}
          >
            <span className={styles.my_location_title}>현재 위치</span>
            <div className={styles.my_location_name}>{location}</div>
          </div>
          {nearbyShelterRef.current.length !== 0 ? (
            nearbyShelterRef.current.map((item, idx) => (
              <div
                className={`${styles.my_location_item} ${
                  isDisplayed ? styles.displayed : ""
                }`}
                style={{ top: `${70 + 50 * idx}px` }}
              >
                {item.name}
              </div>
            ))
          ) : (
            <div
              className={`${styles.my_location_item} ${
                isDisplayed ? styles.displayed : ""
              }`}
              style={{ top: "70px" }}
            >
              주변 대피소 조회 불가
            </div>
          )}

          <div className={styles.sticky_note}></div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
