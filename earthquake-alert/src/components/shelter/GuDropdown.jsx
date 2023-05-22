import React from "react";
import Select from "react-select";

const GuDropdown = ({ gu, setGu, setDong, handlePageChange }) => {
  const guList = [
    "-",
    "강남구",
    "강동구",
    "강북구",
    "강서구",
    "관악구",
    "광진구",
    "구로구",
    "금천구",
    "노원구",
    "도봉구",
    "동대문구",
    "동작구",
    "마포구",
    "서대문구",
    "서초구",
    "성동구",
    "성북구",
    "송파구",
    "양천구",
    "영등포구",
    "용산구",
    "은평구",
    "종로구",
    "중구",
    "중랑구",
  ];

  const options = guList.map((guItem) => ({
    value: guItem,
    label: guItem,
  }));

  const handleChange = (selectedOption) => {
    setGu(selectedOption.value);
    setDong("-");
    handlePageChange(1);
  };

  const selectedValue = options.find((option) => option.value === gu);
  const dropdownStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused || state.isHover ? "#052c65" : "#084298",
      border: state.isFocused ? "none" : null,
      width: "110px",
      marginRight: "10px",
      borderRadius: "10px",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
    option: (provided) => ({
      ...provided,
      backgroundColor: "#052c65",
      color: "white",
      cursor: "pointer",
    }),
  };
  return (
    <Select
      value={selectedValue}
      options={options}
      onChange={handleChange}
      styles={dropdownStyles}
    />
  );
};

export default GuDropdown;
