import React, { useState, useEffect } from "react";
import styles from "../styles/footer.module.css";
import { Modal, Button } from "react-bootstrap";
import EarthquakeModal from "./modal/EarthquakeModal";
import { fetchEarthquakeData } from "../utils/api";
import { useMediaQuery } from "react-responsive";

const Footer = ({ isSidebarOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [earthquakeData, setEarthquakeData] = useState({
    loc: "",
    lat: "",
    lng: "",
    mt: "",
  });
  const [modalData, setModalData] = useState({
    loc: "",
    lat: "",
    lng: "",
    mt: "",
  });

  const isPC = useMediaQuery({
    query: "(min-width:820px)",
  });

  const isMobile = useMediaQuery({
    query: "(max-width:819px)",
  });

  const handleModalInputChange = (e, field) => {
    setModalData({ ...modalData, [field]: e.target.value });
  };

  useEffect(() => {
    // 페이지 로드 시 지진 데이터 가져오기
    fetchData();
    // 20초마다 지진 데이터 업데이트
    const interval = setInterval(fetchData, 20000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchData = async () => {
    const data = await fetchEarthquakeData();
    setEarthquakeData(data);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalData({
      loc: "",
      lat: "",
      lng: "",
      mt: "",
    });
  };

  const handleModalSave = () => {
    setEarthquakeData(modalData);
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <Modal show={isModalOpen} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>지진 정보 입력</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>
              위치
              <input
                type="text"
                className="form-control"
                value={modalData.loc}
                onChange={(e) => handleModalInputChange(e, "loc")}
                placeholder="위치를 입력하세요."
              />
            </label>
            <label>
              위도
              <input
                type="text"
                className="form-control"
                value={modalData.lat}
                onChange={(e) => handleModalInputChange(e, "lat")}
                placeholder="위도를 입력하세요."
              />
            </label>
            <label>
              경도
              <input
                type="text"
                className="form-control"
                value={modalData.lng}
                onChange={(e) => handleModalInputChange(e, "lng")}
                placeholder="경도를 입력하세요."
              />
            </label>
            <label>
              규모
              <input
                type="text"
                className="form-control"
                value={modalData.mt}
                onChange={(e) => handleModalInputChange(e, "mt")}
                placeholder="규모를 입력하세요."
              />
            </label>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              닫기
            </Button>
            <Button variant="primary" onClick={handleModalSave}>
              저장
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {earthquakeData?.lat &&
        earthquakeData?.lng &&
        earthquakeData?.mt &&
        earthquakeData?.loc && (
          <EarthquakeModal
            closeModal={() => setIsModalOpen(false)}
            earthquakeData={earthquakeData}
          />
        )}
      <footer className={`${styles.footer} ${isSidebarOpen && styles.open}`}>
        <div className={styles.footer_container}>
          <div className={styles.footer_item}>
            <span className={styles.footer_item_title}>지진알리미</span>
            <div>&copy;2023</div>
          </div>
          {isPC && (
            <>
              <div className={styles.footer_item}></div>
              <div className={styles.footer_item}></div>
            </>
          )}
          <div className={styles.footer_item}>
            <Button
              size="lg"
              className="mb-2"
              variant="dark"
              onClick={() => setIsModalOpen(true)}
            >
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
