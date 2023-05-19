import React, { useState } from "react";
import GoogleMap from "../home/GoogleMap";
import ModalMap from "./ModalMap";
import { Modal, Button } from "react-bootstrap";
import Home from "../../pages/Home";

const EarthquakeModal = ({ closeModal }) => {
  const [showModal, setShowModal] = useState(true);
  const [mapModalVisible, setMapModalVisible] = useState(false);

  const earthquakeData = {
    lat: 37.55840227,
    lng: 126.99779874,
    mt: 7.2,
    tmEqk: "2023-05-12 14:30:00",
  };

  const openMapModal = () => {
    setMapModalVisible(true);
    closeModal();
  };

  const closeMapModal = () => {
    setMapModalVisible(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    closeModal();
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>지진이 발생했습니다.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>위도: {earthquakeData.lat}</p>
        <p>경도: {earthquakeData.lng}</p>
        <p>규모: {earthquakeData.mt}</p>
        <p>시간: {earthquakeData.tmEqk}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          확인했습니다.
        </Button>
        <Button variant="primary" onClick={openMapModal}>
          가까운 대피소 찾기
        </Button>
      </Modal.Footer>
      {mapModalVisible && (
        <Modal show={mapModalVisible} onHide={closeMapModal}>
          <Modal.Body>
            <ModalMap lat={earthquakeData.lat} lng={earthquakeData.lng} mapVisible={mapModalVisible} />
          </Modal.Body>
        </Modal>
      )}
    </Modal>
  );
};

export default EarthquakeModal;
