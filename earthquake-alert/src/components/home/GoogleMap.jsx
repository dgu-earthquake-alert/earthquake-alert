import { useState, useEffect, useRef } from "react";
import DistrictSelector from "./DistrictSelector";
import { fetchMapPlaceData } from "../../utils/api";
import styles from "../../styles/home/home.module.css";

const GoogleMap = ({ lat, lng }) => {
  const [map, setMap] = useState(null);
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

  useEffect(() => {
    if (map && lat && lng) {
      map.setCenter({ lat, lng });
    }
  }, [map, lat, lng]);

  window.initMap = async () => {
    const newMap = new window.google.maps.Map(ref.current, {
      center: { lat, lng },
      zoom: 16,
    });
    setMap(newMap);

    try {
      const shelterData = await fetchMapPlaceData();

      shelterData.forEach((shelter) => {
        const marker = new window.google.maps.Marker({
          position: { lat: shelter.lat, lng: shelter.lng },
          map: newMap,
          title: shelter.name,
          icon: {
            url: process.env.PUBLIC_URL + "/images/marker.png",
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(25, 50),
          },
        });
      });
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
