import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GuDropdown from "./components/GuDropdown";
import DongDropdown from "./components/DongDropdown";
import ShelterTable from "./components/ShelterTable";

import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { fetchShelterData } from "./api";

//http://openapi.seoul.go.kr:8088/66524245416c736239334a75697446/json/TbEqkShelter/1/10
const App = () => {
  const [gu, setGu] = useState("-");
  const [dong, setDong] = useState("-");
  const [shelterData, setShelterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShelterData(gu, dong);
      setShelterData(data);
    };
    fetchData();
  }, [gu, dong]);

  return (
    <div className="root">
      <Header />
      <main>
        <div className="offset-2 column-4 d-flex justify-content-start gap-2 p-0">
          <GuDropdown gu={gu} setGu={setGu} setDong={setDong} />
          <DongDropdown gu={gu} dong={dong} setDong={setDong} />
        </div>
      </main>

      <ShelterTable shelterData={shelterData} />
      <Footer />
    </div>
  );
};

export default App;
