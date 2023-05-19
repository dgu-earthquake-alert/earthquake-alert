import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchMapPlaceData } from "../../utils/api";

const ModalMap = ({ lat, lng, mapVisible }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapVisible) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.onload = async () => {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: lat, lng: lng },
          zoom: 15,
        });
        
        new window.google.maps.Marker({
          position: { lat: lat, lng: lng },
          map: map,
          title: "Earthquake Location",
        });

        try {
          const shelterData = await fetchMapPlaceData();
    
          shelterData.forEach((shelter) => {
            const marker = new window.google.maps.Marker({
              position: { lat: shelter.lat, lng: shelter.lng },
              map: map,
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
      document.body.appendChild(script);
    }
  }, [lat, lng, mapVisible]);

  return <div style={{ height: "700px", width: "100%" }} ref={mapRef}></div>;
};

ModalMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  mapVisible: PropTypes.bool.isRequired,
};

export default ModalMap;
