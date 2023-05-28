import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/record/datepicker.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SiDropdown from "../components/record/SiDropdown";
import RecordTable from "../components/record/RecordTable";
import { fetchRecordTableData } from "../utils/api";

const Record = () => {
  const [startDate, setStartDate] = useState(new Date("2018-01-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [recordData, setRecordData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [si, setSi] = useState("-");

  const isPC = useMediaQuery({
    query: "(min-width:820px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:819px)",
  });

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const getData = async () => {
    const result = await fetchRecordTableData(si, startDate, endDate);
    setRecordData(result);
    console.log(result);
  };

  useEffect(() => {
    getData();
  }, [startDate, endDate, si]);

  const updateStartDate = (date) => {
    if (date > endDate) {
      setStartDate(endDate);
    } else {
      setStartDate(date);
    }
    setActivePage(1);
  };

  const updateEndDate = (date) => {
    if (date < startDate) {
      setEndDate(startDate);
    } else {
      setEndDate(date);
    }
    setActivePage(1);
  };

  return (
    <>
      <Header />
      <main className="main">
        <h1 className="main_title">
          {isPC
            ? "지진 발생 이력을 날짜별, 시간별로 조회해보세요."
            : "지진 발생 이력을 조회해보세요."}
        </h1>
        <div className="datepicker_container">
          <div className="datepicker_wrapper">
            <label className="font_color_blue">시작일</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => updateStartDate(date)}
              dateFormat="yyyy-MM-dd"
              locale={ko}
              className="datepicker_button"
            />
          </div>
          <div className="datepicker_wrapper">
            <label className="font_color_blue">종료일</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => updateEndDate(date)}
              dateFormat="yyyy-MM-dd"
              locale={ko}
              className="datepicker_button"
            />
          </div>
          <div className="datepicker_wrapper">
            <label className="font_color_blue" style={{ cursor: "pointer" }}>
              시별조회
            </label>
            <SiDropdown
              si={si}
              setSi={setSi}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
        <RecordTable
          recordData={recordData}
          activePage={activePage}
          handlePageChange={handlePageChange}
        />
      </main>
      <Footer />
    </>
  );
};

export default Record;
