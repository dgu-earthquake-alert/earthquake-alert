import { useState, useEffect, useRef } from "react";
import DistrictSelector from "./DistrictSelector";
import { fetchMapPlaceData } from "../../utils/api";
import styles from "../../styles/home/home.module.css";

let currentInfoWindow = null;

const GoogleMap = ({
  lat,
  lng,
  map,
  setMap,
  shelterMemo,
  toggleShelterClicked,
  handleMapClick,
  recenterMap,
}) => {
  const ref = useRef();

  useEffect(() => {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  window.initMap = async () => {
    try {
      const createInfoWindow = (shelter, marker, map) => {
        const shelterSearchingName = shelter.name.split(" ")[0]; // 첫번째 단어만 가져옵니다. 신연중학교 운동장 -> 신연중학교, 검색 오류 막기 위함입니다.

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
          <div>
            <h5>${shelter.name}</h5>
            <a href="https://map.naver.com/v5/search/${shelterSearchingName}?c=15,15,0,0,dh}" target="_blank">경로 찾기</a>
          </div>
        `,
        });
        marker.addListener("click", () => {
          if (currentInfoWindow) {
            currentInfoWindow.close();
          }
          infoWindow.open(map, marker);
          currentInfoWindow = infoWindow;
        });
      };

      const shelterData = await fetchMapPlaceData();

      const newMap = new window.google.maps.Map(ref.current, {
        center: { lat, lng },
        zoom: 16,
      });
      if (lat && lng) {
        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map: newMap,
          title: "현재 위치",
          icon: {
            url: process.env.PUBLIC_URL + "/images/current.svg",
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          },
        });
      } else {
        console.error("현재 위치 정보가 누락되었습니다.");
      }
      shelterData.forEach((shelter, index) => {
        const marker = new window.google.maps.Marker({
          position: { lat: shelter.lat, lng: shelter.lng },
          map: newMap,
          title: shelter.name,
          icon: {
            url: process.env.PUBLIC_URL + "/images/marker.png",
            scaledSize: new window.google.maps.Size(40, 50),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(25, 50),
          },
        });
        createInfoWindow(shelter, marker, newMap);

        marker.addListener("click", () => {
          toggleShelterClicked(index, shelter.name);
        });
      });

      if (newMap instanceof window.google.maps.Map) {
        setMap(newMap);
        newMap.addListener("click", handleMapClick);
      } else {
        console.error("Invalid map instance");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.google_map_container}>
      <DistrictSelector map={map} />
      <div ref={ref} id={styles.map} data-testid="google-map" />
    </div>
  );
};

export default GoogleMap;
