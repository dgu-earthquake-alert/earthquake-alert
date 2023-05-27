import React from "react";
import { Modal, Button } from "react-bootstrap";

const EarthquakeModal = ({
  showEarthquakeModal,
  closeEarthquakeModal,
  earthquakeData,
}) => {
  return (
    <Modal show={showEarthquakeModal} onHide={closeEarthquakeModal}>
      <Modal.Header closeButton>
        <Modal.Title>지진이 발생했습니다.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {earthquakeData &&
          earthquakeData.lat &&
          earthquakeData.lng &&
          earthquakeData.magnitude && (
            <>
              <p>위치: {earthquakeData.location}</p>
              <p>위도: {earthquakeData.lat}</p>
              <p>경도: {earthquakeData.lng}</p>
              <p>규모: {earthquakeData.magnitude}</p>
              <p>
                시간:{" "}
                {earthquakeData.tmEqk.substring(2, 4) +
                  "년 " +
                  parseInt(earthquakeData.tmEqk.substring(4, 6)) +
                  "월 " +
                  parseInt(earthquakeData.tmEqk.substring(6, 8)) +
                  "일 " +
                  earthquakeData.tmEqk.substring(8, 10) +
                  "시 " +
                  earthquakeData.tmEqk.substring(10, 12) +
                  "분 " +
                  earthquakeData.tmEqk.substring(12, 14) +
                  "초"}
              </p>
            </>
          )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeEarthquakeModal}>
          내 주변 대피소 찾기
        </Button>
        <Button variant="primary" onClick={closeEarthquakeModal}>
          진앙지 주변 대피소 찾기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EarthquakeModal;
