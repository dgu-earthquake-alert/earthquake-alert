import React, { useEffect, useState, useCallback } from "react";
import EarthquakeModal from "./components/modal/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

function ModalTest() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [earthquakeData, setEarthquakeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fakeEarthquakeData, setFakeEarthquakeData] = useState(null);
  const alarmSound = new Audio("/alarm.wav");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      setIsLoading(false);
    });
  }, []);

  const getEarthquakeData = useCallback(async () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const fromTmFc = `${year}${month}${day}`;
    const toTmFc = `${year}${month}${day}`;
    const key =
      "9LvErBY85c3YIkUDq4aM8PRO9tr%2F0r%2BgKfqGsbAL8xHYVtGToRx7z2Lb06fd73Ws0v%2FOeFrR6KVMVUENsFxJAw%3D%3D";

    const response = await fetch(
      `http://apis.data.go.kr/1360000/EqkInfoService/getEqkMsg?serviceKey=${key}&numOfRows=10&pageNo=1&fromTmFc=${fromTmFc}&toTmFc=${toTmFc}&dataType=json`
    );
    const data = await response.json();
    return data;
  }, []);

  const openModal = useCallback((data) => {
    if (
      data &&
      data.response &&
      data.response.body &&
      data.response.body.items &&
      data.response.body.items.item
    ) {
      const earthquakeData = data.response.body.items.item.find(
        (item) => item.mt >= 5
      );
      if (earthquakeData) {
        if (currentLocation) {
          const distance = getDistanceFromLatLonInKm(
            currentLocation.latitude,
            currentLocation.longitude,
            earthquakeData.lat,
            earthquakeData.lon
          );
          console.log(distance);
          if (distance <= 10) {
            const currentTime = getCurrentTime();
            const earthquakeTime = new Date(earthquakeData.tmEqk);
            const timeDiff = (currentTime - earthquakeTime) / 60000;
            console.log(timeDiff);
            if (timeDiff <= 5) {
              setModalOpen(true);
              alarmSound.load();
              alarmSound.play();
              setEarthquakeData(earthquakeData);
            } else {
              setModalOpen(false);
              setEarthquakeData(null);
            }
          } else {
            setModalOpen(false);
            setEarthquakeData(null);
          }
        } else {
          console.log("위치 정보를 가져올 수 없습니다.");
          setModalOpen(false);
          setEarthquakeData(null);
        }
      } else {
        console.log("규모 5 이상의 지진이 발생하지 않았습니다.");
        setModalOpen(false);
        setEarthquakeData(null);
      }
    } else {
      console.log("데이터를 가져올 수 없습니다.");
      setModalOpen(false);
      setEarthquakeData(null);
    }
  }, []);

  const getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;
    return parseInt(timestamp);
  };

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1); // deg2rad below
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  useEffect(() => {
    if (!isLoading && currentLocation) {
      const fakeEarthquakeData = {
        response: {
          header: { resultCode: "00", resultMsg: "NORMAL_SERVICE" },
          body: {
            dataType: "JSON",
            items: {
              item: [
                {
                  cnt: 0,
                  fcTp: 0,
                  img: "",
                  inT: "",
                  lat: currentLocation.latitude,
                  loc: "",
                  lon: currentLocation.longitude,
                  mt: 7,
                  rem: "",
                  stnId: 0,
                  tmEqk: getCurrentTime(),
                  tmFc: 0,
                  tmSeq: 0,
                  dep: 0
                }
              ]
            },
            pageNo: 0,
            numOfRows: 0,
            totalCount: 0
          }
        }
      };
      setFakeEarthquakeData(fakeEarthquakeData);
    }
  }, [currentLocation, isLoading]);

  useEffect(() => {
    setInterval(() => {
      getEarthquakeData().then((data) => {
        openModal(data);
      });
    }, 60000);
  }, [getEarthquakeData, openModal]);

  const closeModal = () => {
    openModal(false);
    setEarthquakeData(null);
  };

  return (
    <div>
      {modalOpen && (
        <EarthquakeModal
          earthquakeData={earthquakeData}
          closeModal={closeModal}
        />
      )}
      <button
        onClick={() => {
          openModal(fakeEarthquakeData);
          console.log(fakeEarthquakeData);
        }}
      >
        가짜 지진 발생
      </button>
    </div>
  );
}

export default ModalTest;
