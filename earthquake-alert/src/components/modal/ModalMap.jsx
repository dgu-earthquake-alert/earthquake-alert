import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchMapPlaceData } from "../../utils/api";

const ModalMap = ({ lat, lng, mapVisible, initMap }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const createMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15,
      });

      mapInstanceRef.current = map;

      new window.google.maps.Marker({
        position: { lat, lng },
        map,
        title: `지진 발생 (${lat}, ${lng})`,
      });

      try {
        const fetchShelterData = async () => {
          const shelterData = await fetchMapPlaceData();

          shelterData.forEach((shelter) => {
            new window.google.maps.Marker({
              position: { lat: shelter.lat, lng: shelter.lng },
              map,
              title: shelter.name,
              icon: {
                url: process.env.PUBLIC_URL + "/images/marker.png",
                scaledSize: new window.google.maps.Size(40, 50),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(25, 50),
              },
            });
          });
        };

        fetchShelterData();
      } catch (error) {
        console.error(error.message);
      }
    };

    const loadMap = () => {
      if (window.google && window.google.maps) {
        createMap();
      } else {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
        script.async = true;
        script.onload = createMap;
        document.body.appendChild(script);
      }
    };

    if (mapVisible) {
      if ("IntersectionObserver" in window) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                loadMap();
                observerRef.current.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "0px 0px 200px 0px" }
        );

        if (mapRef.current) {
          observerRef.current.observe(mapRef.current);
        }
      } else {
        loadMap();
      }
    }

    return () => {
      if (observerRef.current && mapRef.current) {
        observerRef.current.unobserve(mapRef.current);
      }
    };
  }, [lat, lng, mapVisible]);

  useEffect(() => {
    if (!mapVisible && mapInstanceRef.current) {
      mapInstanceRef.current.setMap(null);
    }
  }, [mapVisible]);

  return <div style={{ height: "700px", width: "100%" }} ref={mapRef}></div>;
};

ModalMap.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  mapVisible: PropTypes.bool.isRequired,
  initMap: PropTypes.func.isRequired,
};

export default ModalMap;
