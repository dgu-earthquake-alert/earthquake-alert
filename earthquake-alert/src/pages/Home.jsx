import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import GoogleMap from "../components/GoogleMap";
import "../styles/App.css";
import "../styles/Sidebar.css";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useState("위치정보없음");
  const [lat, setLat] = useState(37.569227); // 위도
  const [lng, setLng] = useState(126.9777256); // 경도
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

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
        <Sidebar
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          location={location}
          getMyLocation={getMyLocation}
        />
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
