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
  clickedLocation,
}) => {
  const [isRotated, setIsRotated] = useState(false); // 새로고침버튼 회전 여부
  const [isModalOpen, setIsModalOpen] = useState(false); // 북마크 모달창 여부
  const [bookmarkName, setBookmarkName] = useState(""); // 북마크 이름
  const [isDisplayed, setIsDisplayed] = useState(true); // 대피소 정보 표시 여부
  const [bookmarks, setBookmarks] = useState([]); // Store bookmarks
  const nearbyShelterRef = useRef([]); // 주변 대피소 정보

  let topValue;

  if (isDisplayed) {
    topValue =
      70 +
      50 *
        (nearbyShelterRef.current.length === 0
          ? 1
          : nearbyShelterRef.current.length);
  } else {
    topValue = 70;
  }

  const refresh = () => {
    setIsRotated(true);
    getMyLocation();
    setTimeout(() => {
      setIsRotated(false);
    }, 500);
  };

  const handleBookmarkSave = () => {
    const newBookmark = {
      name: bookmarkName,
      location: clickedLocation,
    };

    setBookmarks([...bookmarks, newBookmark]);
    setIsModalOpen(false);
    setBookmarkName("");
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
      {/* 사이드바 오픈 */}
      <button
        className={`${styles.bookmark_button} ${
          isSidebarOpen ? styles.open : ""
        }`}
        onClick={toggleSidebar}
      >
        ⭐
      </button>

      {/* 위치 북마크 모달 */}
      {isModalOpen && (
        <div className={styles.modal_overlay}>
          <div className={styles.modal_content}>
            <button
              className={styles.close_button}
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <label>
              저장 이름
              <input
                type="text"
                className={styles.modal_input}
                value={bookmarkName}
                onChange={(e) => setBookmarkName(e.target.value)}
                placeholder="저장할 이름을 입력하세요."
              />
            </label>
            <label>
              저장 위치
              <input
                type="text"
                className={styles.modal_input}
                value={clickedLocation}
                placeholder="지도에서 클릭한 위치가 표시됩니다."
              />
            </label>
            <p>
              <button
                className={styles.modal_button}
                onClick={handleBookmarkSave}
              >
                저장
              </button>
              <button
                className={styles.modal_button}
                onClick={() => setIsModalOpen(false)}
              >
                취소
              </button>
            </p>
          </div>
        </div>
      )}

      {/* 사이드바 */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div
          className={`${styles.bookmark_refresh} ${
            isRotated ? styles.rotate : ""
          }`}
          onClick={refresh}
        ></div>
        <div
          className={styles.bookmark_add}
          onClick={() => setIsModalOpen(true)}
        ></div>
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

          {/* Display Bookmarks */}
          {bookmarks.length > 0 && (
            <div className={styles.bookmark_list}>
              {bookmarks.map((bookmark, idx) => (
                <div
                  className={styles.my_location}
                  style={{
                    top: `${topValue + 70 * idx}px`,
                  }}
                  key={`${bookmark.name}_${idx}`}
                >
                  <div className={styles.my_location_title}>
                    {bookmark.name}
                  </div>
                  <div className={styles.my_location_name}>
                    {bookmark.location}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={styles.sticky_note}></div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
