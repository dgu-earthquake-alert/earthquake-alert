import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const GuDropdown = ({ gu, setGu, setDong }) => {
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

  const handleGuChange = (selectedGu) => {
    setGu(selectedGu);
    setDong("-");
  };

  return (
    <Dropdown style={{ marginTop: "10px", width: "110px" }}>
      <DropdownButton
        id="gu-dropdown"
        title={gu}
        onSelect={(e) => handleGuChange(e)}
        style={{
          height: "250px",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {guList.map((guItem) => (
          <Dropdown.Item key={guItem} eventKey={guItem}>
            {guItem}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </Dropdown>
  );
};

export default GuDropdown;
