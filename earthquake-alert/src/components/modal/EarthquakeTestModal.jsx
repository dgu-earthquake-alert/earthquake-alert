import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";

const coordinatesMap = {
  서울: { lat: 37.5665, lng: 126.978 },
  경기: { lat: 37.4138, lng: 127.5183 },
  인천: { lat: 37.4563, lng: 126.7052 },
  부산: { lat: 35.1796, lng: 129.0756 },
  대구: { lat: 35.8714, lng: 128.6014 },
  대전: { lat: 36.3504, lng: 127.3845 },
  광주: { lat: 35.1595, lng: 126.8526 },
  울산: { lat: 35.5384, lng: 129.3114 },
  세종: { lat: 36.4801, lng: 127.289 },
  강원: { lat: 37.8228, lng: 128.1555 },
  충북: { lat: 36.6356, lng: 127.4914 },
  충남: { lat: 36.5184, lng: 126.8 },
  전북: { lat: 35.8203, lng: 127.1088 },
  전남: { lat: 34.8161, lng: 126.4631 },
  경북: { lat: 36.5753, lng: 128.5059 },
  경남: { lat: 35.2383, lng: 128.6924 },
  제주: { lat: 33.489, lng: 126.4983 },
};

const options = Object.keys(coordinatesMap).map((location) => ({
  value: location,
  label: location,
}));

const dropdownStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#084298",
    width: "110px",
    marginRight: "10px",
    borderRadius: "20px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  option: (provided) => ({
    ...provided,
    color: "black",
  }),
};

const EarthquakeTestModal = ({
  showEarthquakeTestModal,
  closeEarthquakeTestModal,
  handleEarthquakeModalOpen,
}) => {
  const [selectedLocation, setSelectedLocation] = useState("서울");
  const [magnitude, setMagnitude] = useState(5.5);

  const handleTestSend = () => {
    const now = new Date();
    const data = {
      ...coordinatesMap[selectedLocation],
      magnitude,
      location: selectedLocation,
      tmEqk: now.toISOString(),
    };
    handleEarthquakeModalOpen(data);
    closeEarthquakeTestModal();
  };

  const handleCancel = () => {
    closeEarthquakeTestModal();
  };

  const handleChange = (selectedOption) => {
    setSelectedLocation(selectedOption.value);
  };

  const selectedValue = options.find(
    (option) => option.value === selectedLocation
  );

  return (
    <Modal show={showEarthquakeTestModal} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title>지진알리미와 함께 시뮬레이션 해보세요.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>발생위치</Form.Label>
        <Select
          value={selectedValue}
          options={options}
          onChange={handleChange}
          styles={dropdownStyles}
        />
        <Form.Label>규모</Form.Label>
        <Form.Control
          type="number"
          placeholder="Magnitude"
          value={magnitude}
          onChange={(e) => setMagnitude(Number(e.target.value))}
          style={{ width: "30%" }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleTestSend}>
          Test Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EarthquakeTestModal;
