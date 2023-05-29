import React, { useState, useEffect } from "react";
import styles from "../styles/footer.module.css";
import { Button } from "react-bootstrap";

const Footer = ({ isSidebarOpen, handleTestModalOpen }) => {
  return (
    <>
      <footer className={`${styles.footer} ${isSidebarOpen && styles.open}`}>
        <div className={styles.footer_container}>
          <div className={styles.footer_item}>
            <span className={styles.footer_item_title}>지진알리미</span>
            <div>&copy;2023</div>
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
