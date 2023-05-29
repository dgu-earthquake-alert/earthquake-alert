import React from "react";
import { Modal, Button } from "react-bootstrap";

const EarthquakeModal = ({ earthquakeData, closeModal }) => {
  const { lat, lon, mt, tmEqk } = earthquakeData;
  const redirectToNaverMap = () => {
    const mapUrl = `https://map.naver.com/v5/directions/${lon},${lat}/${
      lon - 0.01
    },${lat - 0.01}/-/walk?c=15,0,0,0,dh&destination=`;
    window.location.href = mapUrl;
  };

  return (
    <Modal show={true} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>지진이 발생했습니다.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>위도: {lat}</p>
        <p>경도: {lon}</p>
        <p>규모: {mt}</p>
        <p>시간: {tmEqk}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          확인했습니다.
        </Button>
        <Button variant="primary" onClick={redirectToNaverMap}>
          가까운 대피소 찾기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EarthquakeModal;
