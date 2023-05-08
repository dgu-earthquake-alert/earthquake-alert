import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GoogleMap from "../components/GoogleMap";
import "../styles/App.css";
import "../styles/Sidebar.css";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("위치정보없음");
  const [lat, setLat] = useState(37.569227); // 위도
  const [lng, setLng] = useState(126.9777256); // 경도
  const [isRotated, setIsRotated] = useState(false); // 새로고침버튼 회전
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  let shelterNumber = 1; // css position 계산용
  const top = 64 + 70 * shelterNumber; // css position 계산용

  const saveLocation = () => {
    localStorage.setItem("location", location);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const getMyLocation = () => {
    function onGeoOK(position) {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    }
    function onGeoError() {
      setLocation("위치정보없음");
    }
    navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);
  };

  const refresh = () => {
    setIsRotated(true);
    getMyLocation();
    setTimeout(() => {
      setIsRotated(false);
    }, 500);
  };

  useEffect(() => {
    if (localStorage.getItem("location") !== null) {
      localStorage.getItem("location");
      setLocation(localStorage.getItem("location"));
    }
    getMyLocation(); // 최초에 위치 정보를 받아옴

    setInterval(() => {
      getMyLocation();
    }, 10000); // 10초마다 위치 정보를 받아옴
  }, []);

  // 위치 정보가 바뀌면 location을 업데이트
  useEffect(() => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLocation(data.results[0].formatted_address.slice(5));
      });
  }, [lat, lng]);

  // location이 바뀌면 localStorage에 새로 저장
  useEffect(() => {
    saveLocation();
  }, [location]);

  return (
    <div>
      <div className="root">
        <Header isOpen={isOpen} />
        <button
          className={`bookmark_button ${isOpen ? "open" : ""}`}
          onClick={toggleSidebar}
        >
          ⭐
        </button>
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
          <div
            className={`bookmark_refresh ${isRotated ? "rotate" : ""}`}
            onClick={refresh}
          ></div>
          <div className="bookmark_add"></div>
          <div className="bookmark_remove"></div>
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
        <main className={`main ${isOpen ? "open" : ""}`}>
          <div className="map_title">내 주변 대피소를 찾아보세요</div>
          <div className="map">
            <GoogleMap lat={lat} lng={lng} />
          </div>
        </main>
      </div>
      <Footer isOpen={isOpen} />
    </div>
  );
}

export default Home;
