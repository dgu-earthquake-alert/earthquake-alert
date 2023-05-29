import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Shelter from "./pages/Shelter";
import Record from "./pages/Record";
import Home from "./pages/Home";
import Rule from "./pages/Rule/Rule";
import SubPage1 from "./pages/Rule/SubPage1";
import SubPage2 from "./pages/Rule/SubPage2";
import EarthquakeModal from "./components/modal/EarthquakeModal";
import firebase from "firebase/compat/app";
import "firebase/compat/messaging";
import { sendTokenToServer } from "./utils/api";

const App = () => {
  const navigate = useNavigate();
  const [showEarthquakeModal, setShowEarthquakeModal] = useState(false);
  const [earthquakeData, setEarthquakeData] = useState(null);

  useEffect(() => {
    const messaging = firebase.messaging();

    // 비동기 함수 선언
    const requestPermissionAndInitializeMessaging = async () => {
      // Notification API 지원 여부 확인
      if (!("Notification" in window)) {
        console.log("이 브라우저는 Notification API를 지원하지 않습니다.");
        return;
      }

      // 권한 요청
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.log("푸시 알람 권한이 거부되었습니다.");
        return;
      }
      console.log("알림 권한이 허용되었습니다.");

      // 토큰 가져오기
      const currentToken = await messaging.getToken({
        vapidKey: process.env.REACT_APP_VAPID_KEY,
      });
      if (currentToken) {
        sendTokenToServer(currentToken);
      } else {
        console.log("지진 조기경보 시 푸시 알람을 받아보실 수 없습니다.");
      }

      // 메시지 핸들러 등록
      messaging.onMessage((payload) => {
        console.log("Message received. ", payload);
        const data = {
          location: payload.data.loc,
          lat: payload.data.lat,
          lng: payload.data.lon,
          magnitude: payload.data.mt,
          tmEqk: payload.data.time,
        };

        setEarthquakeData(data);
        setShowEarthquakeModal(true);
      });
    };

    // 비동기 함수 호출
    requestPermissionAndInitializeMessaging();
  }, [navigate]);

  const closeEarthquakeModal = () => {
    setShowEarthquakeModal(false);
  };

  return (
    <div>
      <Routes>
        <Route path="/shelter" element={<Shelter />} />
        <Route path="/record" element={<Record />} />
        <Route path="/rule" element={<Rule />}>
          <Route path="subpage1" element={<SubPage1 />} />
          <Route path="subpage2" element={<SubPage2 />} />
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
      {showEarthquakeModal && (
        <EarthquakeModal
          showEarthquakeModal={showEarthquakeModal}
          closeEarthquakeModal={closeEarthquakeModal}
          earthquakeData={earthquakeData}
        />
      )}
    </div>
  );
};

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
