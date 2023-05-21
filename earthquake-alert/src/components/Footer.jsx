import React, { useState } from "react";
import styles from "../styles/footer.module.css";
import { Modal, Button } from "react-bootstrap";
import EarthquakeModal from "./modal/EarthquakeModal";

const Footer = ({ isSidebarOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [earthquakeData, setEarthquakeData] = useState({
    loc:"",
    lat: "",
    lng: "",
    mt: "",
  });

  const handleModalInputChange = (e, field) => {
    setEarthquakeData({ ...earthquakeData, [field]: e.target.value });
  };

  const handleModalSave = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
          <Modal.Header closeButton>
          <Modal.Title>지진 정보 입력</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
              위치
              <input
                type="text"
                className="form-control"
                value={earthquakeData.loc}
                onChange={(e) => handleModalInputChange(e, "loc")}
                placeholder="위치를 입력하세요."
              />
            </label>
            <label>
              위도
              <input
                type="text"
                className="form-control"
                value={earthquakeData.lat}
                onChange={(e) => handleModalInputChange(e, "lat")}
                placeholder="위도를 입력하세요."
              />
            </label>
            <label>
              경도
              <input
                type="text"
                className="form-control"
                value={earthquakeData.lng}
                onChange={(e) => handleModalInputChange(e, "lng")}
                placeholder="경도를 입력하세요."
              />
            </label>
            <label>
              규모
              <input
                type="text"
                className="form-control"
                value={earthquakeData.mt}
                onChange={(e) => handleModalInputChange(e, "mt")}
                placeholder="규모를 입력하세요."
              />
            </label>
            
          </Modal.Body>
        </Modal>
      )}
      {earthquakeData.lat &&
        earthquakeData.lng &&
        earthquakeData.mt &&
        earthquakeData.loc && (
          <EarthquakeModal
            closeModal={() => setIsModalOpen(false)}
            earthquakeData={earthquakeData}
          />
        )}
      <footer className={`${styles.footer} ${isSidebarOpen && styles.open}`}>
        <div className={styles.footer_container}>
          <div className={styles.footer_item}>
            <span className={styles.footer_item_title}>지진알리미</span>
            <br />
            &copy; 2023
          </div>
          <div className={styles.footer_item}></div>
          <div className={styles.footer_item}></div>
          <div className={styles.footer_item}>
            <Button size="lg" variant="dark" onClick={() => setIsModalOpen(true)}>
              Test Modal
            </Button>
            <div>
              loc: 동국대학교 <br />
              lat: 37.55840227 <br />
              lng: 126.99779874
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
