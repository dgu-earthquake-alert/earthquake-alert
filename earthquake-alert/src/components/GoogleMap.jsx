import { useState, useEffect, useRef } from "react";
import "../styles/App.css";
import DistrictSelector from "./DistrictSelector";

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

  window.initMap = () => {
    const newMap = new window.google.maps.Map(ref.current, {
      center: { lat: 37.569227, lng: 126.9777256 },
      zoom: 16
    });
    setMap(newMap);
  };

  return (
    <div className="google_map_container">
      <DistrictSelector map={map} />
      <div ref={ref} id="map" data-testid="google-map"/>
    </div>
  );
};

export default GoogleMap;