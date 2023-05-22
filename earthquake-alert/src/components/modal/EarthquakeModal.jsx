import React, { useState, useEffect } from "react";
import ModalMap from "./ModalMap";
import { Modal, Button } from "react-bootstrap";

const EarthquakeModal = ({ closeModal, earthquakeData }) => {
  const [showModal, setShowModal] = useState(false);
  const [mapModalVisible, setMapModalVisible] = useState(false);

  useEffect(() => {
    if (earthquakeData) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [earthquakeData]);

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
    <>
      {showModal && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>지진이 발생했습니다.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>위치: {earthquakeData.loc}</p>
            <p>위도: {earthquakeData.lat}</p>
            <p>경도: {earthquakeData.lng}</p>
            <p>규모: {earthquakeData.mt}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              확인했습니다.
            </Button>
            <Button variant="primary" onClick={openMapModal}>
              가까운 대피소 찾기
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {mapModalVisible && (
        <Modal show={mapModalVisible} onHide={closeMapModal}>
          <Modal.Body>
            <ModalMap
              lat={Number(earthquakeData.lat)}
              lng={Number(earthquakeData.lng)}
              mapVisible={mapModalVisible}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default EarthquakeModal;
