import { useState } from "react";

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
        className={`bookmark_button ${isSidebarOpen ? "open" : ""}`}
        onClick={toggleSidebar}
      >
        ⭐
      </button>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div
          className={`bookmark_refresh ${isRotated ? "rotate" : ""}`}
          onClick={refresh}
        ></div>
        <div className="bookmark_add"></div>
        <div className="bookmark_remove"></div>

        <div>
          <div className="my_location">
            <span className="my_location_title">현재 위치</span>
            {location}
          </div>
          <div className="my_location_item" style={{ top: `${top}px` }}>
            대피소 {shelterNumber++}
          </div>
          <div className="my_location_item" style={{ top: `${top}px` }}>
            대피소 {shelterNumber++}
          </div>
          <div className="my_location_item" style={{ top: `${top}px` }}>
            대피소 {shelterNumber++}
          </div>

          <div className="sticky_note"></div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
