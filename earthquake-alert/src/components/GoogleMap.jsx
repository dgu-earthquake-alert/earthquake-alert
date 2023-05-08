import { useState, useEffect, useRef } from "react";
import "../styles/App.css";
import DistrictSelector from "./DistrictSelector";
import { fetchShelterData } from "../utils/api";

const GoogleMap = () => {
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

  window.initMap = async () => {
    const newMap = new window.google.maps.Map(ref.current, {
      center: { lat: 37.55840227, lng: 126.99779874 }, // 동국대학교 중앙으로 위치 설정
      zoom: 16
    });
    setMap(newMap);
  
    try {
      const shelterData = await fetchShelterData(); 
  
      shelterData.forEach((shelter) => {
        const marker = new window.google.maps.Marker({
          position: { lat: shelter.lat, lng: shelter.lng },
          map: newMap,
          title: shelter.name,
          icon: {
            url: process.env.PUBLIC_URL + "/images/marker.png",
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(25, 50)
          }
        });
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="google_map_container">
      <DistrictSelector map={map} />
      <div ref={ref} id="map" data-testid="google-map"/>
    </div>
  );
};

export default GoogleMap;