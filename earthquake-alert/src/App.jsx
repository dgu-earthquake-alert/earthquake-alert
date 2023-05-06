import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import GuDropdown from "./components/GuDropdown";
import DongDropdown from "./components/DongDropdown";
import ShelterTable from "./components/ShelterTable";

import "./styles/App.css";
import "./styles/dropdown.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { fetchShelterData } from "./api";

//http://openapi.seoul.go.kr:8088/66524245416c736239334a75697446/json/TbEqkShelter/1/10
const App = () => {
  const [gu, setGu] = useState("-");
  const [dong, setDong] = useState("-");
  const [shelterData, setShelterData] = useState([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShelterData(gu, dong);
      setShelterData(data);
    };
    fetchData();
  }, [gu, dong]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <div className="root">
      <Header />
      <main className="main">
        <h1 className="main_title">지진대피소 상세 정보를 조회해 보세요.</h1>
        <div className="dropdown_wrapper">
          <GuDropdown
            gu={gu}
            setGu={setGu}
            setDong={setDong}
            handlePageChange={handlePageChange}
          />
          <DongDropdown
            gu={gu}
            dong={dong}
            setDong={setDong}
            handlePageChange={handlePageChange}
          />
        </div>
      </main>

      <ShelterTable
        shelterData={shelterData}
        activePage={activePage}
        handlePageChange={handlePageChange}
      />
      <Footer />
    </div>
  );
};

export default App;
