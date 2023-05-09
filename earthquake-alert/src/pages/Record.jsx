import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/record/datepicker.css";
import SiDropdown from "../components/record/SiDropdown";
import RecordTable from "../components/record/RecordTable";
import { fetchRecordTableData } from "../utils/api";

const Record = () => {
  const [startDate, setStartDate] = useState(new Date("2018-01-01"));
  const [endDate, setEndDate] = useState(new Date());
  const [recordData, setRecordData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [si, setSi] = useState("-");

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
    <main className="main">
      <h1 className="main_title">
        지진 발생 이력을 날짜별 지역별로 조회해보세요.
      </h1>
      <div className="datepicker_container">
        <div>
          <label>시작일</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => updateStartDate(date)}
            dateFormat="yyyy-MM-dd"
            locale={ko}
            className="datepicker_button"
          />
        </div>
        <div>
          <label>종료일</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => updateEndDate(date)}
            dateFormat="yyyy-MM-dd"
            locale={ko}
            className="datepicker_button"
          />
        </div>
        <div>
          <label>시별조회</label>
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
  );
};

export default Record;
