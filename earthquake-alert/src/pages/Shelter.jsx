// Shelter.jsx
import React, { useState, useEffect } from "react";
import GuDropdown from "../components/shelter/GuDropdown";
import DongDropdown from "../components/shelter/DongDropdown";
import ShelterTable from "../components/shelter/ShelterTable";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/shelter/dropdown.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchShelterTableData } from "../utils/api";

const Shelter = () => {
  const [gu, setGu] = useState("-");
  const [dong, setDong] = useState("-");
  const [shelterData, setShelterData] = useState([]);
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchShelterTableData(gu, dong);
      setShelterData(data);
    };
    fetchData();
  }, [gu, dong]);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main_title">지진대피소 상세 정보를 조회해 보세요.</h1>
        <div className="dropdown_container">
          <label className="font_color_blue" style={{ cursor: "pointer" }}>
            구별조회
            <GuDropdown
              gu={gu}
              setGu={setGu}
              setDong={setDong}
              handlePageChange={handlePageChange}
            />
          </label>
          <label className="font_color_blue" style={{ cursor: "pointer" }}>
            동별조회
            <DongDropdown
              gu={gu}
              dong={dong}
              setDong={setDong}
              handlePageChange={handlePageChange}
            />
          </label>
        </div>

        <ShelterTable
          shelterData={shelterData}
          activePage={activePage}
          handlePageChange={handlePageChange}
        />
      </main>

      <Footer />
    </>
  );
};

export default Shelter;
