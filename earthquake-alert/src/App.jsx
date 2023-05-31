import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Shelter from "./pages/Shelter";
import Record from "./pages/Record";
import Home from "./pages/Home";
import Rule from "./pages/Rule/Rule";
import SubPage1 from "./pages/Rule/SubPage1";
import SubPage2 from "./pages/Rule/SubPage2";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import EarthquakeModal from "./components/modal/EarthquakeModal";
import firebase from "firebase/compat/app";
import "firebase/compat/messaging";
import { sendTokenToServer } from "./utils/api";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showEarthquakeModal, setShowEarthquakeModal] = useState(false);
  const [earthquakeData, setEarthquakeData] = useState(null);

  useEffect(() => {
    const saveToken = () => {
      const urlParams = new URLSearchParams(location.search);
      const token = urlParams.get("token");

      if (token) {
        sessionStorage.setItem("token", token);
        navigate("/");
      }
    };

    saveToken();
  }, [location.search]);

  useEffect(() => {
    const messaging = firebase.messaging();

    // 비동기 함수 선언
    const requestPermissionAndInitializeMessaging = async () => {
      // Notification API 지원 여부 확인
      if (!("Notification" in window)) {
        return;
      }

      // 권한 요청
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        return;
      }

      // 토큰 가져오기
      const currentToken = await messaging.getToken({
        vapidKey: process.env.REACT_APP_VAPID_KEY,
      });
      if (currentToken) {
        sendTokenToServer(currentToken);
      } else {
      }
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
        <Route path="/privacy" element={<PrivacyPolicy />} />
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
