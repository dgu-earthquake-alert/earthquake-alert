import React from "react";
import Select from "react-select";

const SiDropdown = ({ si, setSi, handlePageChange }) => {
  const siList = [
    "-",
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "세종",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
  ];

  const options = siList.map((siItem) => ({
    value: siItem,
    label: siItem,
  }));

  const handleChange = (selectedOption) => {
    setSi(selectedOption.value);
    handlePageChange(1);
  };

  const selectedValue = options.find((option) => option.value === si);

  const dropdownStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor:
        state.isFocused || state.isHovered ? "#052c65" : "#084298",
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

export default SiDropdown;
