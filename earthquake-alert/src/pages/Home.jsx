import React, { useEffect, useState } from "react";
import Sidebar from "../components/home/Sidebar";
import GoogleMap from "../components/home/GoogleMap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/home/home.module.css";

function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [location, setLocation] = useState("위치정보없음");
  const [clickedLocation, setClickedLocation] = useState(""); // 지도 클릭시 위치정보 저장
  const [lat, setLat] = useState(37.569227); // 위도
  const [lng, setLng] = useState(126.9777256); // 경도
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const saveLocation = () => {
    localStorage.setItem("location", location);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getMyLocation = () => {
    function onGeoOK(position) {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);

      let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${API_KEY}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setLocation(data.results[0].formatted_address.slice(5));
        });
    }

    function onGeoError() {
      setLocation("위치정보없음");
    }

    navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);
  };

  useEffect(() => {
    if (localStorage.getItem("location") !== null) {
      setLocation(localStorage.getItem("location"));
    }
    getMyLocation(); // 최초에 위치 정보를 받아옴

    setInterval(() => {
      getMyLocation();
    }, 10000); // 10초마다 위치 정보를 받아옴
  }, []);

  // location이 바뀌면 localStorage에 새로 저장
  useEffect(() => {
    saveLocation();
  }, [location]);

  // 지도에서 클릭한 곳의 주소를 가져오는 함수
  const handleMapClick = (event) => {
    const clickedLocation = event.latLng;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: clickedLocation }, (results, status) => {
      if (status === "OK" && results[0]) {
        const address = results[0].formatted_address;
        setClickedLocation(address);
      }
    });
  };

  useEffect(() => {
    console.log(clickedLocation);
  }, [clickedLocation]);

  return (
    <div className="root">
      <Header isSidebarOpen={isSidebarOpen} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        lat={lat}
        lng={lng}
        location={location}
        getMyLocation={getMyLocation}
      />
      <main className={`${styles.main} ${isSidebarOpen ? styles.open : ""}`}>
        <div className={styles.map_title}>내 주변 대피소를 찾아보세요</div>
        <div className={styles.map}>
          <GoogleMap lat={lat} lng={lng} handleMapClick={handleMapClick} />
        </div>
      </main>
      <Footer isSidebarOpen={isSidebarOpen} />
    </div>
  );
}

export default Home;
