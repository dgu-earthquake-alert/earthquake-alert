import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import RecordTable from "../components/record/RecordTable";
import { fetchRecordData } from "../utils/api";

const Record = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [data, setData] = useState([]);

  const getData = async () => {
    const result = await fetchRecordData(startDate, endDate);
    setData(result);
  };

  useEffect(() => {
    getData();
  }, [startDate, endDate]);

  return (
    <div>
      <h2>기록 조회</h2>
      <div>
        <label>시작일: </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <div>
        <label>종료일: </label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
        />
      </div>
      <RecordTable data={data} />
    </div>
  );
};

export default Record;
