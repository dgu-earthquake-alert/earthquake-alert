import { useState, useEffect, useRef } from "react";
import DistrictSelector from "./DistrictSelector";
import { fetchMapPlaceData } from "../../utils/api";
import styles from "../../styles/home/home.module.css";

const GoogleMap = ({
  lat,
  lng,
  map,
  setMap,
  shelterMemo,
  toggleShelterClicked,
  handleMapClick,
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
      const shelterData = await fetchMapPlaceData();

      const newMap = new window.google.maps.Map(ref.current, {
        center: { lat, lng },
        zoom: 16,
      });

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
