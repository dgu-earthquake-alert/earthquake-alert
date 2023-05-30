import React from "react";
import styles from "../styles/footer.module.css";
import { Link } from "react-router-dom";

const Footer = ({ isSidebarOpen, handleTestModalOpen }) => {
  return (
    <>
      <footer className={`${styles.footer} ${isSidebarOpen && styles.open}`}>
        <div className={styles.footer_container}>
          <div className={styles.footer_item}>
            <span className={styles.footer_item_title}>지진알리미</span>
            <div className={styles.footer_item_desc}>&copy;2023</div>
            <Link
              to="/privacy"
              className={`${styles.footer_item_desc} mt-1`}
              target="_blank"
            >
              개인정보처리방침
            </Link>
          </div>
          <div className={styles.footer_item}></div>
          <div className={styles.footer_item}></div>
          <div className={styles.footer_item}></div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
